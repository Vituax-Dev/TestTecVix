CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- tipos ENUM para os 3 níveis de permissão
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'member');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');

-- table principal usuários
CREATE TABLE IF NOT EXISTS users (
  -- identificação
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  
  -- pessoais
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  
  -- permissão test
  role user_role DEFAULT 'member' NOT NULL,
  status user_status DEFAULT 'active' NOT NULL,
  
  -- control session
  last_login_at TIMESTAMP WITH TIME ZONE,
  last_login_ip INET,
  refresh_token TEXT,
  refresh_token_expires TIMESTAMP WITH TIME ZONE,
  
  -- auditoria
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE,
  
  -- validation 
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);



CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(role) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_status ON users(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_refresh_token ON users(refresh_token) WHERE refresh_token IS NOT NULL;

-- trigger update-at


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- JWT


CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(token_hash);


-- table log auditorai


CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100),
  resource_id UUID,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);


INSERT INTO users (email, password_hash, name, role, status) VALUES
  (
    'admin@vituax.com',
    '$2b$10$FP4Spb/tOd/Z5JfHBqVG4.nm0NIdoUJ59ICnQbvIG9jdj6pr2Ia5e',
    'Administrator Vituax',
    'admin',
    'active'
  ),
  (
    'manager@vituax.com',
    '$2b$10$cw1UDmYj7cd.9rBh8Driku.jX0MIX8lCgo6i9.7C.C3tDPly/USRq',
    'Manager Vituax',
    'manager',
    'active'
  ),
  (
    'member@vituax.com',
    '$2b$10$RrBWTYKqUTTK/BL2.jnlD.8My4Btw2VY10vXsQqpTR2GlEl51ycNa',
    'Member Vituax',
    'member',
    'active'
  )
ON CONFLICT (email) DO NOTHING;



-- visualizar usuários ativos


CREATE OR REPLACE VIEW active_users AS
SELECT 
  id, email, name, role, status, avatar_url,
  last_login_at, created_at
FROM users
WHERE status = 'active' AND deleted_at IS NULL;


-- verifica permissão


CREATE OR REPLACE FUNCTION has_permission(
  user_role_param user_role,
  required_role_param user_role
)
RETURNS BOOLEAN AS $$
BEGIN
 
  IF user_role_param = 'admin' THEN
    RETURN TRUE;
  END IF;
  
  
  IF user_role_param = 'manager' AND required_role_param IN ('manager', 'member') THEN
    RETURN TRUE;
  END IF;
  

  IF user_role_param = 'member' AND required_role_param = 'member' THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

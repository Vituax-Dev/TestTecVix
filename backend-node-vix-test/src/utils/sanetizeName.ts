export const sanetizeName = (filename: string, limit: number = 100) => {
  const truncateString =
    filename.length > limit
      ? filename.slice(filename.length - limit, filename.length)
      : filename;

  const withoutDiacritics = truncateString
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const sanitized = withoutDiacritics
    .replace(/[\\/:*?"<>|]/g, "_") // Substitui caracteres inválidos para nomes de arquivo
    .replace(/\s+/g, "_") // Substitui espaços por underscore
    .replace(/@/g, "_at_") // Opcional: substitui @ para maior clareza
    .replace(/%/g, "_percent_") // Substitui porcentagem para legibilidade
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, "") // Remove caracteres de controle
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove caracteres de controle
    .replace(/[^\x20-\x7E]/g, "") // Retém apenas caracteres imprimíveis (espaço a `~`)
    .replace(/_+/g, "_") // Reduz múltiplos underscores consecutivos para um único underscore
    .trim(); // Remove underscores extras no início ou fim

  return sanitized;
};

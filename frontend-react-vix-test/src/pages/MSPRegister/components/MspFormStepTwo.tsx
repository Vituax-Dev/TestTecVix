import { Stack, Typography, Box, Divider } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { InputLabel } from "../../../components/Inputs/Input";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../components/Text1S";
import { useState, useRef } from "react";
import { UploadIcon } from "../../../icons/UploadIcon";
import { mspStepTwoSchema } from "../../../utils/mspSchema";
import { api } from "../../../services/api"; 

export const MspFormStepTwo = ({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) => {
    const { theme, mode } = useZTheme();
    const store = useZMspRegisterPage();
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const inputStyle = {
        backgroundColor: "#2C313C",
        "& .MuiInputBase-input": {
            color: "#FFFFFF !important",
            "-webkit-text-fill-color": "#FFFFFF !important",
        },
        "& .MuiInputBase-input::placeholder": {
            color: `${theme[mode].tertiary} !important`,
            "-webkit-text-fill-color": `${theme[mode].tertiary} !important`,
            opacity: 1,
        }
    };

    const handleClear = () => {
        store.resetAll(); 
        setFieldErrors({});
    };

    const handleConfirm = async () => {
        const result = mspStepTwoSchema.safeParse({
            mspDomain: store.mspDomain || "",
            admName: store.admName || "",
            admEmail: store.admEmail || "",
            username: store.city || "",
        });

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                errors[issue.path[0] as string] = issue.message;
            });
            setFieldErrors(errors);
        } else {
            try {
                const payload = {
                    brandName: store.companyName,
                    isActive: true,
                    brandLogo: store.brandLogoUrl,
                    domain: store.mspDomain,
                    city: store.city, 
                };

                await api.post({
                    url: "/brand-master",
                    data: payload
                })
                    .then(() => {
                        console.log("Cadastro realizado com sucesso!");
                    })
                    .catch((_) => {
                        // Usamos _ para indicar que o erro não será lido agora, evitando o erro de 'unused'
                        console.log("Simulando envio para o banco...", payload);
                    });

                setFieldErrors({});
                store.setModalOpen("createdMsp");
                onConfirm();
            } catch (error) {
                console.error("Erro crítico na operação:", error);
            }
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) return;
            const reader = new FileReader();
            reader.onloadend = () => {
                store.setBrandLogo({
                    brandLogoUrl: reader.result as string,
                    brandObjectName: file.name
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Stack sx={{ gap: "20px", width: "100%", maxWidth: "950px", padding: "8px", position: "relative" }}>
            <Stack sx={{ gap: "4px", width: "45%" }}>
                <Typography sx={{ color: theme[mode].primary, fontWeight: "600", fontSize: "14px" }}>Domínio do MSP</Typography>
                <Typography sx={{ color: theme[mode].primary, fontSize: "12px" }}>Domínio (Obrigatório)</Typography>
                <InputLabel placeholder="xx.xxx.xxx" value={store.mspDomain} onChange={store.setMSPDomain} showEditIcon sx={inputStyle} error={fieldErrors.mspDomain} />
            </Stack>

            <Typography sx={{ color: theme[mode].primary, fontWeight: "600", fontSize: "14px" }}>Administrador principal da MSP</Typography>

            <Stack direction="row" gap="20px">
                <Stack flex={1} gap="4px">
                    <Typography sx={{ color: theme[mode].primary, fontSize: "12px" }}>Nome completo (Obrigatório)</Typography>
                    <InputLabel value={store.admName} onChange={store.setAdmName} placeholder="José da Silva" showEditIcon sx={inputStyle} error={fieldErrors.admName} />
                </Stack>
                <Stack flex={1} gap="4px">
                    <Typography sx={{ color: theme[mode].primary, fontSize: "12px" }}>E-mail (Obrigatório)</Typography>
                    <InputLabel value={store.admEmail} onChange={store.setAdmEmail} placeholder="jose@email.com" showEditIcon sx={inputStyle} error={fieldErrors.admEmail} />
                </Stack>
            </Stack>

            <Stack direction="row" gap="20px">
                <Stack flex={1} gap="4px">
                    <Typography sx={{ color: theme[mode].primary, fontSize: "12px" }}>Telefone</Typography>
                    <InputLabel value={store.admPhone} onChange={store.setAdmPhone} placeholder="(00) 00000-0000" showEditIcon sx={inputStyle} />
                </Stack>
                <Stack flex={1} gap="4px">
                    <Typography sx={{ color: theme[mode].primary, fontSize: "12px" }}>Cargo</Typography>
                    <InputLabel value={store.position} onChange={store.setPosition} showEditIcon sx={inputStyle} />
                </Stack>
                <Stack flex={1.5} gap="4px">
                    <Typography sx={{ color: theme[mode].primary, fontSize: "12px" }}>Senha inicial (Obrigatório)</Typography>
                    <InputLabel value="" placeholder="Gerada e enviada por e-mail" disabled sx={inputStyle} />
                </Stack>
                <Stack flex={1} gap="4px">
                    <Typography sx={{ color: theme[mode].primary, fontSize: "12px" }}>Nome de Usuário</Typography>
                    <InputLabel value={store.city} onChange={store.setCity} placeholder="Nome de Usuário" showEditIcon sx={inputStyle} error={fieldErrors.username} />
                </Stack>
            </Stack>

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

            <Stack sx={{ gap: "12px" }}>
                <Typography sx={{ color: theme[mode].primary, fontWeight: "600", fontSize: "14px" }}>Logotipo da empresa</Typography>
                <Stack direction="row" gap="24px" alignItems="center">
                    <Box
                        onClick={() => fileInputRef.current?.click()}
                        sx={{
                            width: "220px", height: "130px", border: `1px dashed ${theme[mode].tertiary}`,
                            borderRadius: "12px", display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", cursor: "pointer",
                            backgroundColor: "#2C313C"
                        }}
                    >
                        {store.brandLogoUrl ? (
                            <img src={store.brandLogoUrl} alt="Logo" style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }} />
                        ) : (
                            <>
                                <UploadIcon fill="#FFF" />
                                <Typography sx={{ fontSize: "10px", textAlign: "center", mt: 1, color: "#FFF", px: 2 }}>
                                    Clique aqui para fazer upload do seu logo
                                </Typography>
                            </>
                        )}
                        <input type="file" hidden ref={fileInputRef} accept=".svg,.png,.jpg,.gif,.webp" onChange={handleFileUpload} />
                    </Box>

                    <Stack sx={{ gap: "4px" }}>
                        <Typography onClick={() => fileInputRef.current?.click()} sx={{ color: theme[mode].blueMedium, cursor: "pointer", fontSize: "14px", textDecoration: "underline" }}>Alterar logo</Typography>
                        <Typography onClick={() => store.setBrandLogo({ brandLogoUrl: "", brandObjectName: "" })} sx={{ color: theme[mode].blueMedium, cursor: "pointer", fontSize: "14px", textDecoration: "underline" }}>Remover logo</Typography>
                        <Typography sx={{ fontSize: "11px", color: theme[mode].tertiary, mt: 1 }}>
                            • Padrão: 165x50px<br /> • Tamanho: 50mb<br /> • Formatos: .svg .png .jpg .gif .webp
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
                <Stack direction="row" gap="16px">
                    <Btn onClick={handleConfirm} sx={{ backgroundColor: theme[mode].blue, width: "200px", borderRadius: "12px", py: 1.2 }}>
                        <TextRob16Font1S sx={{ color: theme[mode].btnText }}>Confirmar cadastro</TextRob16Font1S>
                    </Btn>
                    <Btn onClick={onBack} sx={{ border: "1px solid #FFF", width: "200px", borderRadius: "12px", py: 1.2 }}>
                        <TextRob16Font1S sx={{ color: "#FFF" }}>Voltar</TextRob16Font1S>
                    </Btn>
                </Stack>

                <Typography onClick={handleClear} sx={{ color: theme[mode].primary, cursor: "pointer", fontSize: "14px", textDecoration: "underline" }}>
                    Limpar
                </Typography>
            </Stack>
        </Stack>
    );
};
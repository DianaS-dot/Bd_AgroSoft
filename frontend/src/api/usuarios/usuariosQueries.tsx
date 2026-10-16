// URL base de tu backend NestJS / Express
// Cambia '3000' por el puerto donde se ejecute tu servidor backend si es diferente
const API_URL = 'http://localhost:3000'; 

// ==========================================
// 1. AUTENTICACIÓN Y REGISTRO
// ==========================================

// Iniciar Sesión (Login)
export const loginUsuario = async (credenciales: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credenciales),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al iniciar sesión');
  }

  return await response.json(); // Devuelve normalmente { token, usuario }
};

// Crear Cuenta (Registro)
export const registrarUsuario = async (datosRegistro: {
  nombre: string;
  apellido: string;
  rol: string;
  idFicha: string;
  telefono: string;
  nombreFinca: string;
  email?: string;
  password?: string;
}) => {
  const response = await fetch(`${API_URL}/auth/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosRegistro),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al crear la cuenta');
  }

  return await response.json();
};

// Solicitar Recuperación de Contraseña
export const solicitarRecuperacionContrasena = async (email: string) => {
  const response = await fetch(`${API_URL}/auth/recuperar-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al enviar la solicitud de recuperación');
  }

  return await response.json();
};


// ==========================================
// 2. GESTIÓN DEL PERFIL DE USUARIO
// ==========================================

// Obtener la información del usuario autenticado (Perfil)
export const obtenerPerfilUsuario = async (token: string) => {
  const response = await fetch(`${API_URL}/usuarios/perfil`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al obtener los datos del usuario');
  }

  return await response.json();
};

// Actualizar información personal (Ventana emergente: Editar Perfil)
export const actualizarPerfilUsuario = async (
  datosPerfil: { nombre: string; email: string; telefono: string },
  token: string
) => {
  const response = await fetch(`${API_URL}/usuarios/perfil`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(datosPerfil),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al actualizar el perfil');
  }

  return await response.json();
};

// Cambiar la contraseña (Ventana emergente: Cambiar Contraseña)
export const cambiarContrasena = async (
  passwords: { actual: string; nueva: string },
  token: string
) => {
  const response = await fetch(`${API_URL}/usuarios/cambiar-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(passwords),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al cambiar la contraseña');
  }

  return await response.json();
};     
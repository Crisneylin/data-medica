export enum ErrorFirebase {
    authUserNotFound = 'auth/user-not-found',
    authTooManyRequest = 'auth/too-many-requests',	
    authInvalidPassword = 'auth/invalid-password',
    authInvalidEmailVerified = 'auth/invalid-email-verified',
    authInvalidEmail = 'auth/invalid-email',
    authInvalidLoginCredentials = 'auth/invalid-login-credentials',
    authEmailAlreadyInuse = 'auth/email-already-in-use',
}

export const ErrorFirebaseMessage = new Map<string, string>([
    [ErrorFirebase.authUserNotFound, 'Usuario no encontrado'],
    [ErrorFirebase.authTooManyRequest, 'Demasiadas peticiones, intente más tarde'],
    [ErrorFirebase.authInvalidPassword, 'Contraseña invalida, beben ser minimo 6 caracteres'],
    [ErrorFirebase.authInvalidEmailVerified, 'Email no verificado'],
    [ErrorFirebase.authInvalidEmail, 'Email invalido, debe proporcionar un email valido'],
    [ErrorFirebase.authInvalidLoginCredentials, 'Credenciales invalidas'],
    [ErrorFirebase.authEmailAlreadyInuse, 'Email ya registrado'],

]);
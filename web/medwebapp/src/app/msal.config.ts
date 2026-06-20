import { Configuration, LogLevel, InteractionType } from '@azure/msal-browser';

/**
 * MSAL Configuration for Azure AD B2C or Azure AD
 * Update the values below with your Azure AD app registration details
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: 'e3b8d638-37e5-4d60-81fd-aa49f114e18a', // Replace with your Application (client) ID
    authority: 'https://login.microsoftonline.com/a49897fd-9431-436d-a481-f002d4ae575e', // Replace YOUR_TENANT_ID with your Directory (tenant) ID
    redirectUri: 'http://localhost:4200', // Redirect URI registered in Azure AD
    postLogoutRedirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: 'localStorage', // or 'sessionStorage'
  },
  system: {
    loggerOptions: {
      loggerCallback: (logLevel: LogLevel, message: string, piiEnabled?: boolean) => {
        if (piiEnabled) {
          console.log(message);
        }
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};

/**
 * Scopes for API calls
 * Update the scopes based on your API configuration
 */
export const loginRequest = {
  scopes: ['User.Read'],
  prompt: 'select_account'
};

export const apiScopes = {
  scopes: ['api://e3b8d638-37e5-4d60-81fd-aa49f114e18a/MedAPIScope'], // Replace with your API scopes
};

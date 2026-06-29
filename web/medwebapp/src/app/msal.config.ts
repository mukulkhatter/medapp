import { Configuration, LogLevel, InteractionType } from '@azure/msal-browser';

/**
 * MSAL Configuration for Azure AD B2C or Azure AD
 * Update the values below with your Azure AD app registration details
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: '484b195a-ac59-4931-a072-6c5f7d4105d3', // Replace with your Application (client) ID
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
const apiResourceUri = 'api://0813203e-1567-42c1-8992-8c5ba448abae';

export const loginRequest = {
  scopes: [`${apiResourceUri}/Scope.Read`],
  prompt: 'select_account'
};

export const apiScopes = {
  scopes: [`${apiResourceUri}/Scope.Read`], // Replace with your API scopes
};

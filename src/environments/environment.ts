export const environment = {
  production: false,
  brand: 'SnapGroup',
  awsConfig: {
    API: {
      endpoints: [
        {
          name: 'dev-SnapGroups-ApiGatewayRestApi',
          endpoint: 'https://zf00mmynaj.execute-api.eu-west-1.amazonaws.com/dev',
          region: 'eu-west-1'
        }
      ]
    }
  }
};

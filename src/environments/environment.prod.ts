export const environment = {
  production: true,
  brand: 'SnapGroup',
  s3Bucket: {
    access: {
      accessKeyId: 'AKIAQ74LYQAJRD3P4DVO',
      secretAccessKey: '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',
      region: 'eu-west-1'
    },
    name: 'snapgroup-snaps'
  },
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

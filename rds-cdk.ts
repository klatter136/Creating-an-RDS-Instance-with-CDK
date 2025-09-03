// lib/rds-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

export interface RdsStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class RdsStack extends cdk.Stack {
  public readonly database: rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props: RdsStackProps) {
    super(scope, id, props);

    // Create the database instance
    this.database = new rds.DatabaseInstance(this, 'MyDatabase', {
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED, // put DB in private subnets
        onePerAz: true, // one subnet per availability zone
      },

      // Engine and version
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0,
      }),

      // Instance size
      instanceType: new ec2.InstanceType('t3.micro'),

      // Storage settings
      allocatedStorage: 20,   // starting size
      maxAllocatedStorage: 30, // max size

      // Security and cleanup
      publiclyAccessible: false,
      credentials: rds.Credentials.fromGeneratedSecret('admin'),
      deletionProtection: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deleteAutomatedBackups: true,

      // Good practice options
      copyTagsToSnapshot: true,
      autoMinorVersionUpgrade: true,
    });

    // Add tags for easy identification
    cdk.Tags.of(this).add('Environment', 'Dev');
    cdk.Tags.of(this.database).add('Name', 'MyRdsInstance');

    // Output the database endpoint info
    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: this.database.instanceEndpoint.hostname,
      description: 'The database endpoint hostname',
    });
    new cdk.CfnOutput(this, 'DatabasePort', {
      value: this.database.instanceEndpoint.port.toString(),
      description: 'The database port number',
    });
  }
}
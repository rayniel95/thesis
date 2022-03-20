// tslint:disable:no-unused-expression
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import 'mocha';

import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';
import { FabricControllerAdapter } from '@worldsibu/convector-platform-fabric';
import { BaseStorage, ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';

import { Clinic_history, Clinic_historyController } from '../src';

describe('Clinic_history', () => {
  let adapter: FabricControllerAdapter;
  let clinic_historyCtrl: ConvectorControllerClient<Clinic_historyController>;

  before(async () => {
      adapter = new FabricControllerAdapter({
        skipInit: true,
        txTimeout: 600000,
        user: 'user1',
        channel: 'ch1',
        chaincode: 'clinic_history',
        keyStore: '$HOME/hyperledger-fabric-network/.hfc-org1',
        networkProfile: '$HOME/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml',
        userMspPath: '$HOME/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/User1@org1.hurley.lab/msp',
        userMsp: 'org1MSP'
      });
      clinic_historyCtrl = ClientFactory(Clinic_historyController, adapter);
      await adapter.init(true);

      // BaseStorage.current = new CouchDBStorage({
      //   host: 'localhost',
      //   protocol: 'http',
      //   port: '5084'
      // }, 'ch1_clinic_history');
  });

  after(() => {
    // Close the event listeners
    adapter.close();
  });

  it('should create a default model', async () => {
    await clinic_historyCtrl.create('myca', 124, 'ray', Date.now());

    // const justSavedModel = await Clinic_history.getOne('myco');
    // const model = await clinic_historyCtrl.getHistory(123)

    console.log('devolvio')
    // console.log(model.identifier)
    
    // expect(justSavedModel.id).to.exist;
  });
});
// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Clinic_history, Clinic_historyController } from '../src';

describe('Clinic_history', () => {
  let adapter: MockControllerAdapter;
  let clinic_historyCtrl: ConvectorControllerClient<Clinic_historyController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    clinic_historyCtrl = ClientFactory(Clinic_historyController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'Clinic_historyController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Clinic_history({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await clinic_historyCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Clinic_history>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});
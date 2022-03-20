import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';


export class DrugExposure extends ConvectorModel<DrugExposure> {
    @ReadOnly()
    @Required()
    public readonly type = 'io.worldsibu.drugExposure';

    @ReadOnly()
    @Required()
    public readonly rol = 'droga'

    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public drugId: number

    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public pacientIdentifier: number
    
    @Validate(yup.string())
    public startDate: string

    @Validate(yup.string())
    public endDate: string

    @Validate(yup.string())
    public drugType: string
    
    @Validate(yup.string())
    public stopReason: string

    @Validate(yup.number())
    public daysSupply: number

    @Validate(yup.number())
    public lotNumber: number
}

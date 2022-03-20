import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';


export class Pacient extends ConvectorModel<Pacient> {
    @ReadOnly()
    @Required()
    public readonly type = 'io.worldsibu.pacient';

    @ReadOnly()
    @Required()
    public readonly rol = 'paciente'

    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public identifier: number
    
    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public dayOfBirth: number

    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public monthOfBirth: number

    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public yearOfBirth: number

    @ReadOnly()
    @Required()
    @Validate(yup.string())
    public race: string

    @ReadOnly()
    @Required()
    @Validate(yup.string())
    public sex: string
}

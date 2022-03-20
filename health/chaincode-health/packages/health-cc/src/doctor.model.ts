import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';


export class Doctor extends ConvectorModel<Doctor> {
    @ReadOnly()
    @Required()
    public readonly type = 'io.worldsibu.doctor';

    @ReadOnly()
    @Required()
    public readonly rol = 'doctor'

    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public identifier: number
    
    // owner's identity card name
    @Required()
    @Validate(yup.string())
    public firstName: string;

    @Validate(yup.string())
    public secondName: string

    @Required()
    @Validate(yup.string())
    public firstLastName: string

    @Required()
    @Validate(yup.string())
    public secondLastName: string

    @Validate(yup.string())
    public speciality: string

    @Required()
    @Validate(yup.string())
    public email: string

    @Required()
    @Validate(yup.string())
    public hashedPassword: string
}

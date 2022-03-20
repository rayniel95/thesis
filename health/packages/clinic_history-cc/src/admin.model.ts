import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';


export class Admin extends ConvectorModel<Admin> {
    @ReadOnly()
    @Required()
    public readonly type = 'io.worldsibu.admin';

    @ReadOnly()
    @Required()
    public readonly rol = 'admin'

    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public identifier: number

    // owner's identity card name
    @Required()
    @Validate(yup.string())
    public firstName: string;

    @Required()
    @Validate(yup.string())
    public email: string

    @Required()
    @Validate(yup.string())
    public hashedPassword: string
}

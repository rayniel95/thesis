import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';


export class Note extends ConvectorModel<Note> {
    @ReadOnly()
    @Required()
    public readonly type = 'io.worldsibu.note';

    @ReadOnly()
    @Required()
    public readonly rol = 'nota'

    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public noteId: number //! delete this, use uuid inside smart contract, test it

    @ReadOnly()
    @Required()
    @Validate(yup.number())
    public pacientIdentifier: number

    @ReadOnly()
    @Required()
    @Validate(yup.string())
    public noteDate: string
    
    @Validate(yup.string())
    public noteTitle: string

    @Validate(yup.string())
    public noteText: string
}

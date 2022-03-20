import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
} from '@worldsibu/convector-core';
import * as yup from 'yup'
import { Admin } from './admin.model';
import { Pacient } from './pacient.model';
import { Doctor } from './doctor.model';
import { DrugExposure } from './drug_exposure.model';
import { Note } from './note.model';


@Controller('health')
export class HealthController extends ConvectorController<ChaincodeTx> { 
  
  public async queryAdminByEmail(email: string): Promise<Admin> {

    const admin = await Admin.query(Admin,  {
      'selector': {
        'type': 'io.worldsibu.admin',
        'email': email
      }
    })

    return Array.isArray(admin) ? admin[0]: admin
  }

  public async queryDoctorByEmail(email: string): Promise<Doctor> {

    const doctor = await Doctor.query(Doctor,  {
      'selector': {
        'type': 'io.worldsibu.doctor',
        'email': email
      }
    })

    return Array.isArray(doctor) ? doctor[0]: doctor
  }

  public async queryAdminByIdentifier(identifier: number): Promise<Admin> {

    const admin = await Admin.query(Admin,  {
      'selector': {
        'type': 'io.worldsibu.admin',
        'identifier': identifier
      }
    })

    return Array.isArray(admin) ? admin[0]: admin
  }
  // ! we have many repeated code because we dont know waths doing convector behind scene
  public async queryPacientByIdentifier(identifier: number): Promise<Pacient> {

    const pacient = await Pacient.query(Pacient,  {
      'selector': {
        'type': 'io.worldsibu.pacient',
        'identifier': identifier
      }
    })

    return Array.isArray(pacient) ? pacient[0]: pacient
  }

  public async queryDoctorByIdentifier(identifier: number): Promise<Doctor> {

    const doctor = await Doctor.query(Doctor,  {
      'selector': {
        'type': 'io.worldsibu.doctor',
        'identifier': identifier
      }
    })

    return Array.isArray(doctor) ? doctor[0]: doctor
  }

  public async queryDrugExposureByPacientIdentifier(pacientIdentifier: number): Promise<DrugExposure[]> {

    const drugs = await DrugExposure.query(DrugExposure,  {
      'selector': {
        'type': 'io.worldsibu.drugExposure',
        'pacientIdentifier': pacientIdentifier
      }
    })

    return Array.isArray(drugs) ? drugs: [drugs]
  }

  public async queryDrugExposureByIdentifier(drugIdentifier: number): Promise<DrugExposure> {

    const drugs = await DrugExposure.query(DrugExposure,  {
      'selector': {
        'type': 'io.worldsibu.drugExposure',
        'id': drugIdentifier.toString()
      }
    })

    return Array.isArray(drugs) ? drugs[0]: drugs
  }
  
  public async queryNoteByPacientIdentifier(pacientIdentifier: number): Promise<Note[]> {

    const notes = await Note.query(Note,  {
      'selector': {
        'type': 'io.worldsibu.note',
        'pacientIdentifier': pacientIdentifier
      }
    })

    return Array.isArray(notes) ? notes: [notes]
  }

  public async queryNoteByIdentifier(noteId: number): Promise<Note> {

    const note = await Note.query(Note, {
      'selector': {
        'type': 'io.worldsibu.note',
        'id': noteId.toString()
      }
    })

    return Array.isArray(note) ? note[0]: note
  }
  
  // ! dont throw error, use panic like golang
  @Invokable()
  public async createAdmin(
    @Param(yup.number()) identifier: number,
    @Param(yup.string()) firstName: string, 
    @Param(yup.string()) email: string, 
    @Param(yup.string()) hashedPassword: string
  ): Promise<Admin> {

    const existAdmin = await this.queryAdminByIdentifier(identifier)

    if(existAdmin) {throw new Error('AIL Error, the admin is already in the ledger')}

    const admin = new Admin({
      id: 'io.worldsibu.admin'.concat(identifier.toString()), identifier: identifier,
      firstName: firstName, email: email, hashedPassword: hashedPassword
    })

    await admin.save()
    return admin
  }

  @Invokable()
  public async getAllAdmin(): Promise<Admin[]> {
    return await Admin.getAll()
  }

  @Invokable()
  public async getOneAdmin(@Param(yup.number()) identifier: number): Promise<Admin> {
    const admin = await this.queryAdminByIdentifier(identifier)
    // todo see why !! isnt working, where fuck i see !! was mandatory
    if(!admin) {throw new Error('NF Error, not found admin')}

    return admin
  }

  @Invokable()
  public async getOneAdminByEmail(@Param(yup.string()) email: string): Promise<Admin> {
    const admin = await this.queryAdminByEmail(email)
    // todo see why !! isnt working, where fuck i see !! was mandatory
    if(!admin) {throw new Error('NF Error, not found admin')}

    return admin
  }

  @Invokable()
  public async createDoctor(
    @Param(yup.number()) identifier: number,
    @Param(yup.string()) firstName: string,
    @Param(yup.string()) secondName: string,
    @Param(yup.string()) firstLastName: string,
    @Param(yup.string()) secondLastName: string,
    @Param(yup.string()) speciality: string,
    @Param(yup.string()) email: string,
    @Param(yup.string()) hashedPassword: string
  ): Promise<Doctor> {

    const existDoctor = await this.queryDoctorByIdentifier(identifier)

    if(existDoctor) {throw new Error('AIL Error, the doctor is already in the ledger')}

    const doctor = new Doctor({
      id: 'io.worldsibu.doctor'.concat(identifier.toString()), identifier: identifier,
      firstName: firstName, secondName: secondName, firstLastName: firstLastName, 
      secondLastName: secondLastName, speciality: speciality, email: email, 
      hashedPassword: hashedPassword
    })

    await doctor.save()
    return doctor
  }

  @Invokable()
  public async getAllDoctor(): Promise<Doctor[]> {
    return await Doctor.getAll()
  }

  @Invokable()
  public async getOneDoctor(@Param(yup.number()) identifier: number): Promise<Doctor> {
    
    const doctor = await this.queryDoctorByIdentifier(identifier)

    if(!doctor) {throw new Error('NF Error, not found doctor')}

    return doctor
  }

  @Invokable()
  public async getOneDoctorByEmail(@Param(yup.string()) email: string): Promise<Doctor> {
    const doctor = await this.queryDoctorByEmail(email)
    // todo see why !! isnt working, where i see !! was mandatory
    if(!doctor) {throw new Error('NF Error, not found admin')}

    return doctor
  }

  @Invokable()
  public async createPacient(
    @Param(yup.number()) identifier: number,
    @Param(yup.number()) dayOfBirth: number,
    @Param(yup.number()) monthOfBirth: number,
    @Param(yup.number()) yearOfBirth: number,
    @Param(yup.string()) sex: string,
    @Param(yup.string()) race: string,
  ): Promise<Pacient> {

    const existPacient = await this.queryPacientByIdentifier(identifier)

    if(existPacient) {throw new Error('AIL Error, the pacient is already in the ledger')}

    const pacient = new Pacient({
      id: 'io.worldsibu.pacient'.concat(identifier.toString()), identifier: identifier,
      dayOfBirth: dayOfBirth, monthOfBirth: monthOfBirth, yearOfBirth: yearOfBirth, 
      race: race, sex: sex
    })

    await pacient.save()
    return pacient
  }

  @Invokable()
  public async getAllPacient(): Promise<Pacient[]> {
    return await Pacient.getAll()
  }

  @Invokable()
  public async getOnePacient(@Param(yup.number()) identifier: number): Promise<Pacient> {
    
    const pacient = await this.queryPacientByIdentifier(identifier)
    console.log(pacient)

    if(!pacient) {throw new Error('NF Error, not found pacient')}

    return pacient
  }
  //! we need uuid here, but it have their problems
  @Invokable()
  public async createDrugExposure(
    @Param(yup.number()) drugId: number,
    @Param(yup.number()) pacientIdentifier: number,
    @Param(yup.string()) startDate: string,
    @Param(yup.string()) endDate: string,
    @Param(yup.string()) drugType: string,
    @Param(yup.string()) stopReason: string,
    @Param(yup.number()) daysSupply: number,
    @Param(yup.number()) lotNumber: number
  ): Promise<DrugExposure> {
    const existDrug = await this.queryDrugExposureByIdentifier(drugId)

    if(existDrug) {throw new Error('AIL Error, the drug exposure is already in the ledger')}

    const drug = new DrugExposure({
      id: drugId.toString(), drugId: drugId, pacientIdentifier: pacientIdentifier, 
      startDate: startDate, endDate: endDate, drugType: drugType, 
      stopReason: stopReason, daysSupply: daysSupply, lotNumber: lotNumber
    })
    
    await drug.save()
    return drug
  }

  @Invokable()
  public async getAllDrugExposure(): Promise<DrugExposure[]> {
    return await DrugExposure.getAll()
  }

  @Invokable()
  public async getOneDrugExposure(
    @Param(yup.number()) drugId: number
  ): Promise<DrugExposure> {
    
    const drug = await this.queryDrugExposureByIdentifier(drugId)

    if(!drug) {throw new Error('NF Error, not found drug exposure')}

    return drug
  }

  @Invokable()
  public async getPacientDrugExposure(
    @Param(yup.number()) pacientIdentifier: number
  ): Promise<DrugExposure[]> {
    //? if pacient doesnt exist
    const drugs = await this.queryDrugExposureByPacientIdentifier(pacientIdentifier)

    return drugs
  }

  @Invokable()
  public async createNote(
    @Param(yup.number()) noteId: number,
    @Param(yup.number()) pacientIdentifier: number,
    @Param(yup.string()) noteDate: string,
    @Param(yup.string()) noteTitle: string,
    @Param(yup.string()) noteText: string
  ): Promise<Note> {

    const existNote = await this.queryNoteByIdentifier(noteId)

    if(existNote) {throw new Error('AIL Error, the note is already in the ledger')}

    const note = new Note({
      id: noteId.toString(), noteId: noteId, pacientIdentifier: pacientIdentifier, 
      noteDate: noteDate, noteTitle: noteTitle, noteText: noteText
    })
    
    await note.save()
    return note
  }

  @Invokable()
  public async getAllNote(): Promise<Note[]> {
    return await Note.getAll()
  }

  @Invokable()
  public async getOneNote(
    @Param(yup.number()) noteId: number
  ): Promise<Note> {
    
    const note = await this.queryNoteByIdentifier(noteId)

    if(!note) {throw new Error('NF Error, not found note')}
    //! isnt throwing error when not notes in the ledger
    return note
  }

  @Invokable()
  public async getPacientNote(
    @Param(yup.number()) pacientIdentifier: number
  ): Promise<Note[]> {
    //! you can obtain a note from a not in ledger pacient
    const notes = await this.queryNoteByPacientIdentifier(pacientIdentifier)

    return notes
  }
}
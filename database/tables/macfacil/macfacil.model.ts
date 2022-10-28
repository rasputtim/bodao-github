/**
 * User Model
 * @module Models
 * version 1.0
 */
export type ISetting ={
     idconfig: string;
     token: string;
     value: string;
}
   
   /**
    ## tusuario
   
    */ 
export type IUser ={
   id?: string;
   id_status: number;
   nombre_real?: string;  //not used
   password: string;
   profissao: string;
   comentarios: string;
   fecha_registro: string;
   fecha_nascimento: string;
   fecha_iniciacao: string;
   fecha_elevacao: string;
   fecha_exaltacao: string;
   fecha_instalacao: string;
   direccion: string;
   direccion_rua?: string;
   direccion_no?: number;
   direccion_comp?: string;
   direccion_bairro?: string;
   direccion_mun?: string;
   direccion_cep?: string;
   direccion_UF?: string;
   grau: number;
   telefono?: string;
   telefono2?: string;
   telefono3?: string;
   nivel: number;
   avatar: string;
   foto: string;
   lang: string;
   pwdhash: string;
   disabled: number;
   id_company: number;
   id_comp_ini: number;
   id_comp_ele: number;
   id_comp_exa: number;
   simple_mode: number;
   force_change_pass: number;
   last_pass_change: string;
   last_failed_login: string;
   failed_attempt: number;
   login_blocked: number;
   num_employee: string;
   enable_login: number;
   location: string;
   founder: number;
   name: string;
   id_status_ct: number;
   id_degree_ct: number;
   telephones?:  ITelephone[];
   contacts?: IUserContact[];
   addresses?: IAddress [];
   is_paying_user: boolean;
   expanded?:boolean;
}
   
export type IUsersArray ={
     id?: number;
     Users: [ IUser ];
   
}
   
   /**
     ## tproject
    */
export type IProject ={
     id?: number;
     name: string;
     description: string;
     start: string;
     end: string;
     id_owner: string;
     disabled: number;
     id_project_group: number;
     cc?: string;
     actual: number;
     
}
   
   /**
    ## trole_people_project
    */
export type IRolePeopleProject ={
   id?: number;
   id_user: string;
   id_role: number;
   id_project: number;
}
   
   /**
      ## ttes_bal_division
    */
export type ITesBalDivision ={
     id?: number;
     name: string;
     description: string;
}
   
   /**
     ## ttes_bal_sector
    */
   
export type ITesBalSector ={
     id?: number;
     name: string;
     description: string;
     is_debit : boolean;
     is_balance : boolean;
     is_hospitalary : boolean;
     id_division: number;
}
   
    /**
   ## tes_bal_view_data
     */
   
export type ITesBalViewData ={
   
       id?: number;
       id_bal_final: number;
       id_division: number;
       id_sector: number;
       amount: number;
   
}
   
   /**
     ## ttes_bal_view
    */
   
export type ITesBalView ={
   
     id?: number;
     description: string;
     id_project: number;
     id_bal_01: number;
     id_bal_02: number;
     id_bal_03: number;
     id_bal_04: number;
     id_bal_05: number;
     id_bal_06: number;
     id_bal_07: number;
     id_bal_08: number;
     id_bal_09: number;
     id_bal_10: number;
     id_bal_11: number;
     id_bal_12: number;
     id_bal_13: number;
     id_bal_14: number;
     id_bal_15: number;
     id_bal_16: number;
     id_bal_17: number;
     id_bal_18: number;
     id_bal_19: number;
     id_bal_20: number;
     id_bal_21: number;
     id_bal_22: number;
     id_bal_23: number;
     id_bal_24: number; 
   
}
   
   /**
   ## ttes_balance
    */
export type ITesBalance ={
   id?: number;
   id_project: number;
   year: string;
   month: number;
   description: string;
}
   
   /**
     ## ttes_category
    */
export type ITesCategory ={
   id?: number;
   id_sector: number;
   name: string;
   code: number;
   description: string;
   icon: string;
   parent: number;
   valuable : boolean;  
}
   
   /**
    ## ttes_data
    */
export type ITesData ={
     id?: number;
   amount1: number;
   description: string;
   timestamp: string;
   id_user: string;
   id_product: number;
   id_category: number;
   id_balance: number;
   (string): string;
   id_project: number;
   id_user_refund: string;
}
   
   /**
    ## ttes_payment_detail
    */
export type ITesPaymentDetail ={
   id?: number;
   method_id?: number;
   data_id?: number;
   data_user_id?: number;
   number?: string;
   bank?: string;
   agency?: string;
   account?: string;
   description: string;
}
   
   /**
      ## ttes_payment_method
    */
export type ITesPaymentMethod ={
   id?: number;
   name: string;
   code: string;
   description: string;
   icon: string;
}
   
   /**
      ## ttes_user_category
    */
export type ITesUserCategory ={
   id?: number;
   name: string;
   code: number;
   description: string;
   icon: string;
   parent: number;
   valuable:boolean;
   is_debit: boolean;
}
   
   /**
    ## ttes_user_data
    */
export type ITesUserData ={
   id?: number;
   amount1: number;
   description: string;
   timestamp?: string;
   id_user: string;
   id_product: number;
   id_category: number;
   date: string;
   id_tes?: number;  //when there is reimbursement
}
   
   /**
     ## tusuario_contact
    */
export type IUserContact ={
     id?: number;
   id_usuario: string;
   id_relationship: number;
   name: string;
   email: string;
   phone: string;
   mobile: string;
   profissao: string;
   fecha_nascimento: string;
   fecha_casamento: string;
   direccion: string;
   direccion_no: number;
   direccion_comp: string;
   direccion_bairro: string;
   direccion_mun: string;
   direccion_cep: string;
   direccion_UF: string;
   comentarios: string;
   foto: string;
   disabled: number; 
}
   
   /**
      ## tusuario_grade
    */
export type IUserGrade ={
   id?: number;
   name: string;
}
   
   /**
      ## tusuario_instalation
    */
export type IUserInstallation ={
   id?: number;
   id_user: string;
   id_company: number;
   fecha_instalation: string;
   comentarios: string;
}
   
   /**
      ## tusuario_perfil
    */
export type IUserProfile ={
   id_up: number;
   id_usuario: string;
   id_perfil: number;
   id_grupo: number;
   assigned_by: string;
}
   
   /**
   ## ttes_user_remido
    */
export type IUserRedeemed ={
   id?: number;
   id_user: string;
   start_date: string;
   end_date: string;
   forever: number;
   description: string;
   rem_mens: number;
   rem_cap: number;
   rem_mut: number;
}
   
   /**
     ## tusuario_relationship
    */
export type IUserRelationship ={
   id?: number;
   name: string;
}
   
/**
 * trole
 */
export type IUserRole ={
     id?: number;
     name: string;
     description: string;
     cost?: number;
}
   
   
   /**
     ## trole_people_task
    */
   
export type IRolePeopleTask ={
   id?: number;
   id_user: string;
   id_role: number;
   id_task: number; 
}
   
   /**
      ## tusuario_status
    */
export type IUserStatus ={
   id?: number;
   name: string;
   is_paying_user: number;
}
   
   /**
      ## tcompany
    */
export type ICompany ={
     id?: number;
     name: string;
     address: string;
     fiscal_id: string;
     country: string;
     website: string;
     comments: string;
     id_company_role: number;
     id_parent: number;
     manager: string;
     last_update: string;
     id_rite_ct: number;
     foundation_date: string;
     id_meeting_day_ct: number;
     id_frequency_ct: number;
     id_company_role_ct: number;
     number: number;
     meeting_custom: string;
     id_temple: number;
  }
   
     /**
      ## tcompany_role
      */
  export type ICompanyRole ={
       id?: number;
       name: string;
       description: string;
  }
   
     /**
      * tcommon_lookup
      */
  export type ICommonLookup ={
       id?: number;
       table: string;
       name: string;
       description: string;
       column: string;
       created_by: string;
       creation_date?: string;
       last_updated_by: string;
       last_update_date?: string;
  }

  export type ILanguage = {
     id_language:number;
     name:string;
  }
     
     /**
      * ttelephone
      */
  export type ITelephone ={
       id?: number;
       telephone_context: number;
       telephone_type: number;
       id_country : string;
       telephone: string;
       creation_date: string;
       last_update_date: string;
       created_by: string;
       last_updated_by: string;
       id_contact: string;
  }
   
     /**
      * taddress
      */
  export type IAddress ={
       id?: number;
       address_context: number;
       address_type: number;
       street: string;
       number: number;
       complement: string;
       neighbourhood: string;
       city: string;
       state_province: string;
       postal_code: string;
       id_country: number;
       created_by: string;
       creation_date?: string;
       last_updated_by: string;
       last_update_date?: string;
       id_contact: string;
  }
    
     /**
      * internam model for common_lookup
      */
  export type IContact ={
       id: number;
       name: string;
  }
   
     /**
      * refers to table tagenda
      */
  export type ISchedule ={
       id?: number;
       timestamp?: string;
       id_user: string;
       public: number;
       send_email: number;
       alarm: number;
       duration: number;
       title: string;
       description: string;
       id_type_ct: number;
       start_date: string;
       end_date: string;
       all_day: boolean;
       expanded?: boolean;
  }
   
  export type IAttendance ={
       id?: number;
       id_contact: string;
       id_agenda: number;
       attended: boolean;
       id_type_ct: number;
  }
   
  export type IEvent ={
       id?: number;
       title: string;
       startTime: Date;
       endTime: Date;
       allDay: boolean;
       description: string;
       public: boolean;
       send_email: boolean;
       alarm: boolean;
       id_type_ct: number;
  }
   
  export type IAttachment ={
       id_attachment?: (number);
       id_incidencia: (number);
       id_task: (number);
       id_kb: (number);
       id_lead: (number);
       id_company: (number);
       id_todo: (number);
       id_usuario: (string);
       id_contact: (number);
       id_sec: (number);
       filename: (string);
       description: (string);
       size: (number);
       timestamp: (string);
       id_invoice: (number);
       id_contract: (number);
       id_tes: (number);
       id_ag: (number);
       id_chan: (number);
       id?: (string);
       in_trash: (boolean);
       created_by?: string;
       creation_date?: string;
       last_updated_by?: string;
       last_update_date?: string;
       mime_type: string;
       original_name: string;
       path: string;
       id_type_ct: number;
       id_related: Number;
  }
   
   
  export type UnionEvent = ISchedule | IEvent;
   
  export type IVisitor = {
       id?: number;
       phones?: string;
       name: string;
       details?: string;
       id_gender_ct: number;
  }

  export type tables_t = IVisitor | IAttachment
  

/**
 * common_lookup tables
 * "taddress""address_context"
"taddress"	"address_type"
"ttelephone"	"telephone_type"
ok "tusuario"	"id_degree_ct"
ok "tusuario"	"id_status_ct"
ok "tusuario_contact"	"id_relationship_ct"
"ttelephone"	"telephone_context"
"tagenda"	"id_type_ct"
"tattachment"	"id_type_ct"
"tvisitor"	"id_gender_ct"
"tcompany"	"id_rite_ct"
"tcompany"	"id_meeting_day_ct"
"tcompany"	"id_frequency_ct"
"tcompany"	"id_company_role_ct"

 */

  export const MacFacilTable = {
     ISetting: 'tconfig',
     IUser: 'tusuario',
     IProject: 'tproject',
     IRolePeopleProject: 'trole_people_project',
     ITesBalDivision: 'ttes_bal_division',
     ITesBalSector: 'ttes_bal_sector',
     ITesBalViewData: 'tes_bal_view_data',
     ITesBalView: 'ttes_bal_view',
     ITesBalance: 'ttes_balance',
     ITesCategory: 'ttes_category',
     ITesData: 'ttes_data',
     ITesPaymentDetail: 'ttes_payment_detail',
     ITesPaymentMethod: 'ttes_payment_method',
     ITesUserCategory: 'ttes_user_category',
     ITesUserData: 'ttes_user_data',
     IUserContact: 'tusuario_contact',
     //IUserGrade: 'tusuario_grade', //commonLookup
     IUserInstallation: 'tusuario_instalation',
     //IUserProfile: 'tusuario_perfil',
     IUserRedeemed: 'ttes_user_remido',
     IUserRelationship: 'tusuario_relationship',
     IUserRole: 'trole',
     //IRolePeopleTask: 'trole_people_task',
     //IUserStatus: 'tusuario_status', //commonLookup
     ICompany : 'tcompany',
     //ICompanyRole: 'tcompany_role',  //commonLookup
     ICommonLookup: 'tcommon_lookup' ,
     ITelephone: 'ttelephone',
     IAddress: 'taddress',
     IContact: 'tcontact',
     ISchedule: 'tagenda',
     IAttendance: 'tattendance',
     IAttachment: 'tattachment',
     ILanguage: 'tlanguage',
     IVisitor: 'tvisitor'
   } as const;
   export type MacFacilTable_t = typeof MacFacilTable[keyof typeof  MacFacilTable]


   export const MacFacilEndPoint = {
      ISetting: 'settings',
      IUser: 'users',
      IProject: 'projects',
      IRolePeopleProject: 'rolepeopleprojects',
      ITesBalDivision: 'tesbaldivisions',
      ITesBalSector: 'tesbalsectors',
      ITesBalViewData: 'tesbalviewdata',
      ITesBalView: 'tesbalviews',
      ITesBalance: 'tesbalances',
      ITesCategory: 'tescategories',
      ITesData: 'tesdata',
      ITesPaymentDetail: 'tespaymentdetails',
      ITesPaymentMethod: 'tespaymentmethods',
      ITesUserCategory: 'tesusercategories',
      ITesUserData: 'tesuserdata',
      IUserContact: 'usercontacts',
      CUserGrade: 'usergrades', //commonLookup
      IUserInstallation: 'userinstalations',
      //IUserProfile: 'tusuario_perfil',
      IUserRedeemed: 'usersredeemed',
      CUserRelationship: 'userrelationships',
      IUserRole: 'userroles',
      //IRolePeopleTask: 'trole_people_task',
      CUserStatus: 'userstatus', //commonLookup
      ICompany : 'companies',
      //ICompanyRole: 'tcompany_role',  //commonLookup
      ICommonLookup: 'commonlookups' ,
      ITelephone: 'telephones',
      IAddress: 'addresses',
      //IContact: 'usercontacts',
      ISchedule: 'schedules',
      IAttendance: 'attendances',
      IAttachment: 'attachments',
      ILanguage: 'languages',
      IVisitor: 'visitors',
      IAuth: 'auth'
    } as const;
    export type MacFacilEndPoint_t = typeof MacFacilEndPoint[keyof typeof  MacFacilEndPoint]
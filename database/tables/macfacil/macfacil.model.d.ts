/**
 * User Model
 * @module Models
 * version 1.0
 */
export declare type ISetting = {
    idconfig: string;
    token: string;
    value: string;
};
/**
 ## tusuario

 */
export declare type IUser = {
    id?: string;
    id_status: number;
    nombre_real?: string;
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
    telephones?: ITelephone[];
    contacts?: IUserContact[];
    addresses?: IAddress[];
    is_paying_user: boolean;
    expanded?: boolean;
};
export declare type IUsersArray = {
    id?: number;
    Users: [IUser];
};
/**
  ## tproject
 */
export declare type IProject = {
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
};
/**
 ## trole_people_project
 */
export declare type IRolePeopleProject = {
    id?: number;
    id_user: string;
    id_role: number;
    id_project: number;
};
/**
   ## ttes_bal_division
 */
export declare type ITesBalDivision = {
    id?: number;
    name: string;
    description: string;
};
/**
  ## ttes_bal_sector
 */
export declare type ITesBalSector = {
    id?: number;
    name: string;
    description: string;
    is_debit: boolean;
    is_balance: boolean;
    is_hospitalary: boolean;
    id_division: number;
};
/**
## tes_bal_view_data
 */
export declare type ITesBalViewData = {
    id?: number;
    id_bal_final: number;
    id_division: number;
    id_sector: number;
    amount: number;
};
/**
  ## ttes_bal_view
 */
export declare type ITesBalView = {
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
};
/**
## ttes_balance
 */
export declare type ITesBalance = {
    id?: number;
    id_project: number;
    year: string;
    month: number;
    description: string;
};
/**
  ## ttes_category
 */
export declare type ITesCategory = {
    id?: number;
    id_sector: number;
    name: string;
    code: number;
    description: string;
    icon: string;
    parent: number;
    valuable: boolean;
};
/**
 ## ttes_data
 */
export declare type ITesData = {
    id?: number;
    amount1: number;
    description: string;
    timestamp: string;
    id_user: string;
    id_product: number;
    id_category: number;
    id_balance: number;
    (string: any): string;
    id_project: number;
    id_user_refund: string;
};
/**
 ## ttes_payment_detail
 */
export declare type ITesPaymentDetail = {
    id?: number;
    method_id?: number;
    data_id?: number;
    data_user_id?: number;
    number?: string;
    bank?: string;
    agency?: string;
    account?: string;
    description: string;
};
/**
   ## ttes_payment_method
 */
export declare type ITesPaymentMethod = {
    id?: number;
    name: string;
    code: string;
    description: string;
    icon: string;
};
/**
   ## ttes_user_category
 */
export declare type ITesUserCategory = {
    id?: number;
    name: string;
    code: number;
    description: string;
    icon: string;
    parent: number;
    valuable: boolean;
    is_debit: boolean;
};
/**
 ## ttes_user_data
 */
export declare type ITesUserData = {
    id?: number;
    amount1: number;
    description: string;
    timestamp?: string;
    id_user: string;
    id_product: number;
    id_category: number;
    date: string;
    id_tes?: number;
};
/**
  ## tusuario_contact
 */
export declare type IUserContact = {
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
};
/**
   ## tusuario_grade
 */
export declare type IUserGrade = {
    id?: number;
    name: string;
};
/**
   ## tusuario_instalation
 */
export declare type IUserInstallation = {
    id?: number;
    id_user: string;
    id_company: number;
    fecha_instalation: string;
    comentarios: string;
};
/**
   ## tusuario_perfil
 */
export declare type IUserProfile = {
    id_up: number;
    id_usuario: string;
    id_perfil: number;
    id_grupo: number;
    assigned_by: string;
};
/**
## ttes_user_remido
 */
export declare type IUserRedeemed = {
    id?: number;
    id_user: string;
    start_date: string;
    end_date: string;
    forever: number;
    description: string;
    rem_mens: number;
    rem_cap: number;
    rem_mut: number;
};
/**
  ## tusuario_relationship
 */
export declare type IUserRelationship = {
    id?: number;
    name: string;
};
/**
 * trole
 */
export declare type IUserRole = {
    id?: number;
    name: string;
    description: string;
    cost?: number;
};
/**
  ## trole_people_task
 */
export declare type IRolePeopleTask = {
    id?: number;
    id_user: string;
    id_role: number;
    id_task: number;
};
/**
   ## tusuario_status
 */
export declare type IUserStatus = {
    id?: number;
    name: string;
    is_paying_user: number;
};
/**
   ## tcompany
 */
export declare type ICompany = {
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
};
/**
 ## tcompany_role
 */
export declare type ICompanyRole = {
    id?: number;
    name: string;
    description: string;
};
/**
 * tcommon_lookup
 */
export declare type ICommonLookup = {
    id?: number;
    table: string;
    name: string;
    description: string;
    column: string;
    created_by: string;
    creation_date?: string;
    last_updated_by: string;
    last_update_date?: string;
};
export declare type ILanguage = {
    id_language: number;
    name: string;
};
/**
 * ttelephone
 */
export declare type ITelephone = {
    id?: number;
    telephone_context: number;
    telephone_type: number;
    id_country: string;
    telephone: string;
    creation_date: string;
    last_update_date: string;
    created_by: string;
    last_updated_by: string;
    id_contact: string;
};
/**
 * taddress
 */
export declare type IAddress = {
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
};
/**
 * internam model for common_lookup
 */
export declare type IContact = {
    id: number;
    name: string;
};
/**
 * refers to table tagenda
 */
export declare type ISchedule = {
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
};
export declare type IAttendance = {
    id?: number;
    id_contact: string;
    id_agenda: number;
    attended: boolean;
    id_type_ct: number;
};
export declare type IEvent = {
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
};
export declare type IAttachment = {
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
};
export declare type UnionEvent = ISchedule | IEvent;
export declare type IVisitor = {
    id?: number;
    phones?: string;
    name: string;
    details?: string;
    id_gender_ct: number;
};
export declare type tables_t = IVisitor | IAttachment;
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
export declare const MacFacilTable: {
    readonly ISetting: "tconfig";
    readonly IUser: "tusuario";
    readonly IProject: "tproject";
    readonly IRolePeopleProject: "trole_people_project";
    readonly ITesBalDivision: "ttes_bal_division";
    readonly ITesBalSector: "ttes_bal_sector";
    readonly ITesBalViewData: "tes_bal_view_data";
    readonly ITesBalView: "ttes_bal_view";
    readonly ITesBalance: "ttes_balance";
    readonly ITesCategory: "ttes_category";
    readonly ITesData: "ttes_data";
    readonly ITesPaymentDetail: "ttes_payment_detail";
    readonly ITesPaymentMethod: "ttes_payment_method";
    readonly ITesUserCategory: "ttes_user_category";
    readonly ITesUserData: "ttes_user_data";
    readonly IUserContact: "tusuario_contact";
    readonly IUserInstallation: "tusuario_instalation";
    readonly IUserRedeemed: "ttes_user_remido";
    readonly IUserRelationship: "tusuario_relationship";
    readonly IUserRole: "trole";
    readonly ICompany: "tcompany";
    readonly ICommonLookup: "tcommon_lookup";
    readonly ITelephone: "ttelephone";
    readonly IAddress: "taddress";
    readonly IContact: "tcontact";
    readonly ISchedule: "tagenda";
    readonly IAttendance: "tattendance";
    readonly IAttachment: "tattachment";
    readonly ILanguage: "tlanguage";
    readonly IVisitor: "tvisitor";
};
export declare type MacFacilTable_t = typeof MacFacilTable[keyof typeof MacFacilTable];
export declare const MacFacilEndPoint: {
    readonly ISetting: "settings";
    readonly IUser: "users";
    readonly IProject: "projects";
    readonly IRolePeopleProject: "rolepeopleprojects";
    readonly ITesBalDivision: "tesbaldivisions";
    readonly ITesBalSector: "tesbalsectors";
    readonly ITesBalViewData: "tesbalviewdata";
    readonly ITesBalView: "tesbalviews";
    readonly ITesBalance: "tesbalances";
    readonly ITesCategory: "tescategories";
    readonly ITesData: "tesdata";
    readonly ITesPaymentDetail: "tespaymentdetails";
    readonly ITesPaymentMethod: "tespaymentmethods";
    readonly ITesUserCategory: "tesusercategories";
    readonly ITesUserData: "tesuserdata";
    readonly IUserContact: "usercontacts";
    readonly CUserGrade: "usergrades";
    readonly IUserInstallation: "userinstalations";
    readonly IUserRedeemed: "usersredeemed";
    readonly CUserRelationship: "userrelationships";
    readonly IUserRole: "userroles";
    readonly CUserStatus: "userstatus";
    readonly ICompany: "companies";
    readonly ICommonLookup: "commonlookups";
    readonly ITelephone: "telephones";
    readonly IAddress: "addresses";
    readonly ISchedule: "schedules";
    readonly IAttendance: "attendances";
    readonly IAttachment: "attachments";
    readonly ILanguage: "languages";
    readonly IVisitor: "visitors";
    readonly IAuth: "auth";
};
export declare type MacFacilEndPoint_t = typeof MacFacilEndPoint[keyof typeof MacFacilEndPoint];
//# sourceMappingURL=macfacil.model.d.ts.map
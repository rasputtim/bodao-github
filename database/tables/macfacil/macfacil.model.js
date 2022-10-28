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
    ICompany: 'tcompany',
    //ICompanyRole: 'tcompany_role',  //commonLookup
    ICommonLookup: 'tcommon_lookup',
    ITelephone: 'ttelephone',
    IAddress: 'taddress',
    IContact: 'tcontact',
    ISchedule: 'tagenda',
    IAttendance: 'tattendance',
    IAttachment: 'tattachment',
    ILanguage: 'tlanguage',
    IVisitor: 'tvisitor'
};
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
    CUserGrade: 'usergrades',
    IUserInstallation: 'userinstalations',
    //IUserProfile: 'tusuario_perfil',
    IUserRedeemed: 'usersredeemed',
    CUserRelationship: 'userrelationships',
    IUserRole: 'userroles',
    //IRolePeopleTask: 'trole_people_task',
    CUserStatus: 'userstatus',
    ICompany: 'companies',
    //ICompanyRole: 'tcompany_role',  //commonLookup
    ICommonLookup: 'commonlookups',
    ITelephone: 'telephones',
    IAddress: 'addresses',
    //IContact: 'usercontacts',
    ISchedule: 'schedules',
    IAttendance: 'attendances',
    IAttachment: 'attachments',
    ILanguage: 'languages',
    IVisitor: 'visitors',
    IAuth: 'auth'
};
//# sourceMappingURL=macfacil.model.js.map
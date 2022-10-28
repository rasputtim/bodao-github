import medias from './medias.db.config.js';
import tconfig from './settings.db.config.js';
import taddress from './taddress.db.config.js';
import tagenda from './tagenda.db.config.js';
import tattachment from './tattachment.db.config.js';
import tattendance from './tattendance.db.config.js';
import tcommon_lookup from './tcommon_lookup.db.config.js';
import tcompany from './tcompany.db.config.js';
import tlanguage from './tlanguage.db.config.js';
import tproject from './tproject.db.config.js';
import trole from './trole.db.config.js';
import trole_people_projectTable from './trole_people_project.db.config.js';
import ttelephone from './ttelephone.db.config.js';
import ttes_balance from './ttes_balance.db.config.js';
import ttes_bal_division from './ttes_bal_division.db.config.js';
import ttes_bal_sector from './ttes_bal_sector.db.config.js';
import ttes_bal_view from './ttes_bal_view.db.config.js';
import ttes_bal_view_data from './ttes_bal_view_data.db.config.js';
import ttes_category from './ttes_category.db.config.js';
import tes_data from './ttes_data.db.config.js';
import ttes_payment_detail from './ttes_payment_detail.db.config.js';
import ttes_payment_method from './ttes_payment_method.db.config.js';
import ttes_user_category from './ttes_user_category.db.config.js';
import tes_user_data from './ttes_user_data.db.config.js';
import ttes_user_remido from './ttes_user_redeemed.db.config.js';
import tusuario_contact from './tusuario_contact.db.config.js';
import tusuario_grade from './tusuario_grade.db.config.js';
import tusuario_instalation from './tusuario_instalation.db.config.js';
import tusuario_relationship from './tusuario_relationship.db.config.js';
import tusuario_status from './tusuario_status.db.config.js';
import tvisitor from './tvisitor.db.config.js';
import tusuario from './users.db.config.js';


const rafael = {
  users : tusuario['rafael'],
  usergrades: tusuario_grade['rafael'],
  userrelationships: tusuario_relationship['rafael'],
  userstatus: tusuario_status['rafael'],
  rolepeopleprojects: trole_people_projectTable['rafael'],
  tespaymentdetails: ttes_payment_detail['rafael'],
  tesdata: tes_data['rafael'],
  tesuserdata: tes_user_data['rafael'],
  usercontacts: tusuario_contact['rafael'],
  userinstalations: tusuario_instalation['rafael'],
  usersredeemed: ttes_user_remido['rafael'],
  tescategories: ttes_category['rafael'],
  tespaymentmethods: ttes_payment_method['rafael'],
  tesusercategories: ttes_user_category['rafael'],
  userroles: trole['rafael'],
  languages: tlanguage['rafael'],
  settings: tconfig['rafael'],
  tesbalviewdata: ttes_bal_view_data['rafael'],
  tesbalances: ttes_balance['rafael'],
  tesbaldivisions: ttes_bal_division['rafael'],
  tesbalviews: ttes_bal_view['rafael'],
  tesbalsectors: ttes_bal_sector['rafael'],
  projects: tproject['rafael'],
  companies: tcompany['rafael'],
  commonlookups: tcommon_lookup['rafael'],
  telephones: ttelephone['rafael'],
  addresses: taddress['rafael'],
  schedules: tagenda['rafael'],
  attendances: tattendance['rafael'],
  attachments: tattachment['rafael'],
  visitors: tvisitor['rafael'],
  medias: medias['rafael']
}

const fratleste = {
  users : tusuario['fratleste'],
  usergrades: tusuario_grade['fratleste'], 
  userrelationships: tusuario_relationship['fratleste'] ,
  userstatus: tusuario_status['fratleste'],
  rolepeopleprojects: trole_people_projectTable['fratleste'],
  tespaymentdetails: ttes_payment_detail['fratleste'],
  tesdata: tes_data['fratleste'],
  tesuserdata: tes_user_data['fratleste'],
  usercontacts: tusuario_contact['fratleste'],
  userinstalations: tusuario_instalation['fratleste'],
  usersredeemed: ttes_user_remido['fratleste'],
  tescategories: ttes_category['fratleste'],
  tespaymentmethods: ttes_payment_method['fratleste'],
  tesusercategories: ttes_user_category['fratleste'],
  userroles: trole['fratleste'],
  languages: tlanguage['fratleste'],
  settings: tconfig['fratleste'],
  tesbalviewdata: ttes_bal_view['fratleste'],
  tesbalances: ttes_balance['fratleste'],
  tesbaldivisions: ttes_bal_division['fratleste'],
  tesbalviews: ttes_bal_view['fratleste'],
  tesbalsectors: ttes_bal_sector['fratleste'],
  projects: tproject['fratleste'],
  companies: tcompany['fratleste'],
  commonlookups: tcommon_lookup['fratleste'],
  telephones: ttelephone['fratleste'],
  addresses: taddress['fratleste'],
  schedules: tagenda['fratleste'],
  attendances: tattendance['fratleste'],
  attachments: tattachment['fratleste'],
  visitors: tvisitor['fratleste'],
  medias: medias['fratleste']
}

export default {
 
  rafael: rafael,
  fratlest: fratleste

}
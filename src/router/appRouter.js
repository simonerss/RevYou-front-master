import ExtractionDistribution from './../screens/extractionDistribution/extractionDistribution';
import ExtractionStep from './../screens/extractionStep/ExtractionStep';
import Extraction from './../screens/headers/extraction';
import ManageTemplate from './../screens/templateForm/ManageTemplate';
import ConflictDistribution from './../screens/extractionDistribution/ConflictDistribution';
import ManageExtractionForm from './../screens/extractionForm/ManageExtractionForm';
import ManageConflictForm from './../screens/extractionForm/ManageConflictForm';
import ExtractionControl from './../screens/extractionControl/ExtractionControl';
import PreviousStep from './../screens/extractionStep/PreviousStep';
//minhas routes
import ListProjects from '../screens/project/project';
import InviteResearchers from '../screens/inviteResearchers/inviteResearchers';
import RegisterProject from '../screens/project/registerProject';
import UpdateProject from '../screens/project/updateProject';
import Protocol from '../screens/protocol/protocol';
import UserProfile from '../screens/userProfile/userProfile';
import IdentificationResume from '../screens/identification/identificationResume'
import SpecificBases from '../screens/identification/specificBases';
import IdentificationDuplicates from '../screens/identification/identificationDuplicates';
import SetResearcherBase from '../screens/inviteResearchers/setResearcherBase';
import StudyManually from '../screens/identification/studyManually';

import ProjectDetails from "../screens/project/projectDetails";
// import FirstPage from "../screens/project/FirstPage";
import GraphicStudiesBySearchEngine from "../screens/graphic/graphicStudiesIdentifiedBySearchEngine";
import GraphicAcceptedByYear from "../screens/graphic/graphicAcceptedByYear";
import GraphicIdentifiedByMethod from "../screens/graphic/graphicIdentifiedByMethod";
import GraphicIdentifiedByAdaptedQuery from "../screens/graphic/graphicIdentifiedByAdaptedQuery";
import GraphicSelectionStatusResult from "../screens/graphic/graphicSelectionStatusResult";
import GraphicRejectedByCriteria from "../screens/graphic/graphicRejectedByCriteria";
import GraphicAcceptedBySearchEngine from "../screens/graphic/graphicAcceptedBySearchEngine";
import ProjectInvitations from "../screens/project/projectInvitations";
import ProjectInvitationsTest from "../screens/project/projectInvitationsTest";
import SearchEngineDistribuition from "../screens/project/searchEngineDistribuition";
import SelectionDistribuition from "../screens/distribuition/selectionDistribuition";
import ResearcherSelectionDistribuition from "../screens/distribuition/researcherSelectionDistribuition";
import SelfSelectionDistribuitionDistribuition from "../screens/distribuition/selfSelectionDistribuition";
import StudiesInConflict from "../screens/conflicts/studiesInSelectionConflict";
import StudiesInExtractionConflict from "../screens/conflicts/studiesInExtractionConflict";
import ExtractionStepsList from "../screens/extractionStep/extractionStepsList";
import StudySelectionStepReport from "../screens/studySelection/studySelectionReport";
import StudySelectionResultReport from "../screens/studySelection/studySelectionResultReport";
import IdentifiedStudies from "../screens/identification/identifiedStudies";
import StudyDetails from "../screens/study/studyDetails";
import SearchProjects from "../screens/project/searchProjects";
import AboutProject from "../screens/project/aboutProject";
import ExtractionDistribuition from "../screens/distribuition/extractionDistribuition";
import ResearcherExtractionDistribuition from "../screens/distribuition/researcherExtractionDistribuition";
import ResearcherStudiesExtractionList from "../screens/studyExtraction/researcherStudiesExtractionList";
import DataExtractionDetails from "../screens/studyExtraction/dataExtractionDetails";
import GraphicBubble from "../screens/graphic/graphicBubble";

//--------TESTES:-----------------
import TestExport from "../screens/graphic/testeExportImage";
import TesteExportImage from "../components/apresentacao/testeExportImage";
import TesteExportImageII from "../components/apresentacao/testeExportImageII";
import TesteExportImageIII from "../components/apresentacao/testeExportImageIII";




const appRoutes = [
  {
    name: "TesteExportImage",
    path: "/testeExportImage",
    component: TesteExportImage,
    exact: false,
  },
  {
    name: "TesteExportImageII",
    path: "/testeExportImageII",
    component: TesteExportImageII,
    exact: false,
  },
  {
    name: "TesteExportImageIII",
    path: "/testeExportImageIII",
    component: TesteExportImageIII,
    exact: false,
  },
  // {
  //   name: "FirstPage",
  //   path: "/",
  //   component: SearchProjects,
  //   exact: true
  // },
  {
    name: "Home",
    path: "/home",
    component: ListProjects,
    exact: true
  },
  {
    name: "UserProfile",
    path: "/userprofile",
    component: UserProfile,
    exact: false,
  },
  {
    name: "InviteResearchers",
    path: "/project/inviteresearchers",
    component: InviteResearchers,
    exact: false,
  },
  {
    name: "RegisterProject",
    path: "/newproject",
    component: RegisterProject,
    exact: false,
  },
  {
    name: "UpdateProject",
    path: "/project",
    component: UpdateProject,
    exact: true,
  },
  {
    name: "Protocol",
    path: "/project/protocol",
    component: Protocol,
    exact: false,
  },
  {
    name: "ProjectDetails",
    path: "/project/details/:refproject",
    component: ProjectDetails,
    exact: false,
  },
  {
    name: "GraphicStudiesBySearchEngine",
    path: "/studiesbysearchengine/:refproject",
    component: GraphicStudiesBySearchEngine,
    exact: false,
  },
  {
    name: "GraphicAcceptedByYear",
    path: "/acceptedbyyear/:refproject",
    component: GraphicAcceptedByYear,
    exact: false,
  },
  {
    name: "IdentifiedByMethod",
    path: "/identifiedbymethod/:refproject",
    component: GraphicIdentifiedByMethod,
    exact: false,
  },
  {
    name: "IdentifiedByAdaptedQuery",
    path: "/identifiedByAdaptedQuery/:refproject",
    component: GraphicIdentifiedByAdaptedQuery,
    exact: false,
  },
  {
    name: "SelectionStatusResult",
    path: "/selectionStatusResult/:refproject",
    component: GraphicSelectionStatusResult,
    exact: false,
  },
  {
    name: "RejectedByCriteria",
    path: "/rejectedByCriteria/:refproject",
    component: GraphicRejectedByCriteria,
    exact: false,
  },
  {
    name: "AcceptedBySearchEngine",
    path: "/acceptedBySearchEngine/:refproject",
    component: GraphicAcceptedBySearchEngine,
    exact: false,
  },
  {
    name: "SearchProjects",
    path: "/searchProjects",
    component: SearchProjects,
    exact: false,
  },
  {
    name: "AboutProject",
    path: "/aboutProject/:refproject",
    component: AboutProject,
    exact: false,
  },
  {
    name: "ExtractionDistribuition",
    path: "/extractionDistribuition/:refextraction",
    component: ExtractionDistribuition,
    exact: false,
  },
  {
    name: "ResearcherExtractionDistribuition",
    path: "/researcherExtractionDistribuition/:refproject/:refresearcher",
    component: ResearcherExtractionDistribuition,
    exact: false,
  },
  {
    name: "ResearcherStudiesExtractionList",
    path: "/researcherStudiesExtractionList/:refproject/:refresearcher",
    component: ResearcherStudiesExtractionList,
    exact: false,
  },
  {
    name: "DataExtractionDetails",
    path: "/dataExtractionDetails/:refform/:refstudy/:refresearcher/:reftempform",
    component: DataExtractionDetails,
    exact: false,
  },
  {
    name: "GraphicBubble",
    path: "/graphicBubble",
    component: GraphicBubble,
    exact: false,
  },
  {
    name: "ProjectInvitations",
    path: "/projectInvitations/:refproject",
    component: ProjectInvitations,
    exact: false,
  },
  {
    name: "ProjectInvitationsTest",
    path: "/projectInvitations/test",
    component: ProjectInvitationsTest,
    exact: false,
  },
  {
    name: "TestExport",
    path: "/testexport",
    component: TestExport,
    exact: false,
  },
  {
    name: "SearchEngineDistribuition",
    path: "/searchEngineDistribuition/:refproject",
    component: SearchEngineDistribuition,
    exact: false,
  },
  {
    name: "SelectionDistribuition",
    path: "/selectionDistribuition/:refproject",
    component: SelectionDistribuition,
    exact: false,
  },
  {
    name: "ResearcherSelectionDistribuition",
    path: "/researcherSelectionDistribuition/:refproject/:refresearcher",
    component: ResearcherSelectionDistribuition,
    exact: false,
  },
  {
    name: "selfSelectionDistribuitionDistribuition",
    path: "/selfSelectionDistribuition/:refproject/:refresearcher",
    component: SelfSelectionDistribuitionDistribuition,
    exact: false,
  },
  {
    name: "StudiesInConflict",
    path: "/studiesInConflict/:refproject",
    component: StudiesInConflict,
    exact: false,
  },
  {
    name: "StudiesInExtractionConflict",
    path: "/studiesInExtractionConflict/:refproject",
    component: StudiesInExtractionConflict,
    exact: false,
  },
  {
    name: "ExtractionStepsList",
    path: "/extractionStepsList/:refproject",
    component: ExtractionStepsList,
    exact: false,
  },
  {
    name: "StudySelectionStepReport",
    path: "/studySelectionStepReport/:refstudy",
    component: StudySelectionStepReport,
    exact: false,
  },
  {
    name: "StudySelectionResultReport",
    path: "/studySelectionResultReport/:refselstep/:refstudy/:refresearcher",
    component: StudySelectionResultReport,
    exact: false,
  },
  {
    name: "IdentifiedStudies",
    path: "/identifiedStudies/:refproject",
    component: IdentifiedStudies,
    exact: false,
  },
  {
    name: "StudyDetails",
    path: "/studyDetails/:refstudy/:refproject",
    component: StudyDetails,
    exact: false,
  },  
  {
    name: "Identification",
    path: "/identification",
    component: IdentificationResume,
    exact: true,
  },
  {
    name: "SpecifBase",
    path: "/identification/specificbase/:name",
    component: SpecificBases,
    exact: false,
  },
  {
    name: "Duplicates",
    path: "/identification/duplicates",
    component: IdentificationDuplicates,
    exact: false,
  },
  {
    name: "SetResearchers",
    path: "/identification/setResearcherBase",
    component: SetResearcherBase,
    exact: false,
  },
  {
    name: "studyManually",
    path: "/identification/studyManually",
    component: StudyManually,
    exact: false,
  },
  {
    name: "Extraction",
    path: "/extraction",
    component: Extraction,
    exact: false
  },
  {
    name: "Study Distribution",
    path: "/extraction/distribution",
    component: ExtractionDistribution,
    exact: true
  },
  {
    name: "Conflict Distribution",
    path: "/extraction/conflicts",
    component: ConflictDistribution,
    exact: true
  },
  {
    name: "Step",
    path: "/extraction/step",
    component: ExtractionStep,
    exact: false,
  },
  {
    name: "TemplateForm",
    path: "/extraction/template",
    component: ManageTemplate,
    exact: false,
  },
  {
    name: "Form",
    path: "/extraction/form",
    component: ManageExtractionForm,
    exact: true,
  },
  {
    name: "Conflict",
    path: "/extraction/conflict",
    component: ManageConflictForm,
    exact: true,
  },
  {
    name: "Control",
    path: "/extraction/control",
    component: ExtractionControl,
    exact: false,
  },
  {
    name: "Previous",
    path: "/extraction/previous",
    component: PreviousStep,
    exact: false,
  }
];

export default appRoutes;

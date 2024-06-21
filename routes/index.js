const express = require('express');
const { registerUser, loginUser, getUsers, logoutUser } = require('../Controller/userController');
const { UserRegistryValidate, userLoginValidate } = require('../utils/userValidate');
const { ensureAuthenticated } = require('../utils/auth');

// model validation Functions
const projectApplicantValidate = require('../utils/modelValidate/projectAppliccantValidate');
const RoadmapProgressValidation = require('../utils/modelValidate/roadmapProgressValidate');
const RoadmapValidation = require('../utils/modelValidate/roadmapValidate');
const TestimonialValidation = require('../utils/modelValidate/testimonialValidate');
const ProjectProgressValidation = require('../utils/modelValidate/projectProgressValidate');
const MentorshipRequestValidation = require('../utils/modelValidate/mentorshipValidate');
const MentorValidation = require('../utils/modelValidate/mentorsValidate');
const ProjectValidation = require('../utils/modelValidate/projectvalidate');

const {
    createProject,
    getProjects,
    getProjectsId,
    updateProject,
    deleteProject,
    createBulkProject
} = require('../Controller/projectController/project');

const {
    createRoadmap,
    createBulkRoadmaps,
    getRoadmaps,
    updateRoadmap,
    getRoadmapById,
    deleteRoadmap
} = require('../Controller/roadmapController');

//Mentors CRUD
const {
    createMentor,
    getAllMentors,
    getMentorById,
    updateMentor,
    deleteMentor
} = require('../Controller/mentorsController/mentorsController');

// MentorsRequests CRUD
const {
    createMentorshipRequest,
    getAllMentorshipRequests,
    getMentorshipRequestById,
    updateMentorshipRequest,
    deleteMentorshipRequest
} = require('../Controller/mentorshipController/mentorshipRequestController');

// Project Applicants CRUD
const {
    createProjectApplicant,
    getAllProjectApplicants,
    getProjectApplicantById,
    updateProjectApplicant,
    deleteProjectApplicant
} = require('../Controller/projectApplicantController/projectApplicantController');

// Project Progress CRUD
const {
    createProjectProgress,
    getAllProjectProgress,
    getProjectProgressById,
    updateProjectProgress,
    deleteProjectProgress
} = require('../Controller/projectProgressController/projectProgresController');

// Roadmap Progress CRUD
const {
    createRoadmapProgress,
    getRoadmapProgress,
    getRoadmapProgressById,
    updateRoadmapProgress,
    deleteRoadmapProgress
} = require('../Controller/roadmapProgressController/roadmapProgressController');

// Testimonial CRUD
const {
    createTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
} = require('../Controller/testimonialController/testimonialController');

// FAQs
const {
    createLandingPageFAQ,
    getLandingPageFAQById,
    getLandingPageFAQs,
    deleteLandingPageFAQ,
    updateLandingPageFAQ,
    createBulkLandingPageFAQs
} = require('../Controller/landingPageFAQController');

const {
    createBulkRoadmapPageFAQs,
    createRoadmapPageFAQ,
    deleteRoadmapPageFAQ,
    getRoadmapPageFAQById,
    getRoadmapPageFAQs,
    updateRoadmapPageFAQ
} = require('../Controller/roadmapPageFAQController');

const {
    createBulkProjectPageFAQs,
    createProjectPageFAQ,
    deleteProjectPageFAQ,
    getProjectPageFAQById,
    getProjectPageFAQs,
    updateProjectPageFAQ
} = require('../Controller/projectPageFAQController');

const {
    createHireTalentFromUs,
    getAllHireTalentsFromUs,
    getHireTalentFromUsById,
    updateHireTalentFromUs,
    deleteHireTalentFromUs
} = require('../Controller/hireFromUs/hireFromUsController');

// Task CRUD
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../Controller/Notion/NotionController');

const routes = express.Router();

const {
    createCourseSale,
    getAllCourseSales,
    updateCourseSale,
    deleteCourseSale
} = require('../Controller/CoursesSells/courseSalesController');

const {   createClass, updateClasses, getOnlineClasses,deleteClasses } = require('../Controller/ClassesOnline/ClassesOnlineController');


// User routes
routes.post('/register', UserRegistryValidate, registerUser);
routes.post('/login', userLoginValidate, loginUser);
routes.post('/logout', ensureAuthenticated, logoutUser);
routes.get('/users', ensureAuthenticated, getUsers);

// Project routes
routes.post('/projects', createProject);
routes.post('/projects/bulk', createBulkProject);
routes.get('/projects', getProjects);
routes.put('/projects/:id', ProjectValidation, updateProject);
routes.get('/projects/:id', getProjectsId);
routes.delete('/projects/:id', deleteProject);

// Classes routes
routes.post('/OnlineClasses',  createClass); // Create a new course
routes.put('/OnlineClasses/:id', updateClasses); // Update course progress
routes.get('/OnlineClasses', getOnlineClasses); // Fetch a specific course by ID
routes.delete('/OnlineClasses/:id',deleteClasses);

// Roadmap routes
routes.post('/roadmaps', createRoadmap);
routes.post('/roadmaps/bulk', createBulkRoadmaps);
routes.get('/roadmaps', getRoadmaps);
routes.put('/roadmaps/:id', RoadmapValidation, updateRoadmap);
routes.get('/roadmaps/:id', getRoadmapById);
routes.delete('/roadmaps/:id', deleteRoadmap);

// Mentor routes
routes.post('/mentors', createMentor);
routes.get('/mentors', getAllMentors);
routes.get('/mentors/:id', getMentorById);
routes.put('/mentors/:id', MentorValidation, updateMentor);
routes.delete('/mentors/:id', deleteMentor);

// Mentorship request routes
routes.post('/mentorship-requests', createMentorshipRequest);
routes.get('/mentorship-requests', getAllMentorshipRequests);
routes.get('/mentorship-requests/:id', getMentorshipRequestById);
routes.put('/mentorship-requests/:id', MentorshipRequestValidation, updateMentorshipRequest);
routes.delete('/mentorship-requests/:id', deleteMentorshipRequest);

// Project applicant routes
routes.post('/project-applicants', createProjectApplicant);
routes.get('/project-applicants', getAllProjectApplicants);
routes.get('/project-applicants/:id', getProjectApplicantById);
routes.put('/project-applicants/:id', projectApplicantValidate, updateProjectApplicant);
routes.delete('/project-applicants/:id', deleteProjectApplicant);

// Project progress routes
routes.post('/project-progress', createProjectProgress);
routes.get('/project-progress', getAllProjectProgress);
routes.get('/project-progress/:id', getProjectProgressById);
routes.put('/project-progress/:id', ProjectProgressValidation, updateProjectProgress);
routes.delete('/project-progress/:id', deleteProjectProgress);

// Roadmap progress routes
routes.post('/roadmap-progress', createRoadmapProgress);
routes.get('/roadmap-progress', getRoadmapProgress);
routes.get('/roadmap-progress/:id', getRoadmapProgressById);
routes.put('/roadmap-progress/:id', RoadmapProgressValidation, updateRoadmapProgress);
routes.delete('/roadmap-progress/:id', deleteRoadmapProgress);

// Testimonial routes
routes.post('/testimonials', createTestimonial);
routes.get('/testimonials', getAllTestimonials);
routes.get('/testimonials/:id', getTestimonialById);
routes.put('/testimonials/:id', TestimonialValidation, updateTestimonial);
routes.delete('/testimonials/:id', deleteTestimonial);

// Landing Page FAQs routes
routes.post('/landing-page-faqs', createLandingPageFAQ);
routes.post('/landing-page-faqs/bulk', createBulkLandingPageFAQs);
routes.get('/landing-page-faqs', getLandingPageFAQs);
routes.get('/landing-page-faqs/:id', getLandingPageFAQById);
routes.put('/landing-page-faqs/:id', updateLandingPageFAQ);
routes.delete('/landing-page-faqs/:id', deleteLandingPageFAQ);

// Roadmap Page FAQs routes
routes.post('/roadmap-page-faqs', createRoadmapPageFAQ);
routes.post('/roadmap-page-faqs/bulk', createBulkRoadmapPageFAQs);
routes.get('/roadmap-page-faqs', getRoadmapPageFAQs);
routes.get('/roadmap-page-faqs/:id', getRoadmapPageFAQById);
routes.put('/roadmap-page-faqs/:id', updateRoadmapPageFAQ);
routes.delete('/roadmap-page-faqs/:id', deleteRoadmapPageFAQ);

// Project Page FAQs routes
routes.post('/project-page-faqs', createProjectPageFAQ);
routes.post('/project-page-faqs/bulk', createBulkProjectPageFAQs);
routes.get('/project-page-faqs', getProjectPageFAQs);
routes.get('/project-page-faqs/:id', getProjectPageFAQById);
routes.put('/project-page-faqs/:id', updateProjectPageFAQ);
routes.delete('/project-page-faqs/:id', deleteProjectPageFAQ);

// Hire from us form routes
routes.post('/hire-from-us', createHireTalentFromUs);
routes.get('/hire-from-us', getAllHireTalentsFromUs);
routes.get('/hire-from-us/:id', getHireTalentFromUsById);
routes.put('/hire-from-us/:id', updateHireTalentFromUs);
routes.delete('/hire-from-us/:id', deleteHireTalentFromUs);

// Task CRUD routes
routes.post('/tasks', createTask);
routes.get('/tasks', getAllTasks);
routes.get('/tasks/:id', getTaskById);
routes.put('/tasks/:id', updateTask);
routes.delete('/tasks/:id', deleteTask);


// Course sale routes
routes.post('/courses/sales', createCourseSale);
routes.get('/courses/sales',  getAllCourseSales);

module.exports = routes;

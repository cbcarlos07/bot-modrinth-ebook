const BaseController = require("./base.controller");
const service = require("../../core/services/modrinth.service");
class  ModrinthController extends BaseController{

    constructor(_service){
        super(_service);
    }

    getDataFromMultipleProjects(req, res){
        const { projects } = req.body;
        this.service.getDataFromMultipleProjects(projects)
            .then(data => res.json(data))
            .catch(err => res.status(this.StatusCodes.INTERNAL_SERVER_ERROR).json({error: err.message}));
    }

    getDataFromProject(req, res){
        const {project} = req.params;
        this.service.getDataFromProject(project)
            .then(data => res.json(data))
            .catch(err => res.status(this.StatusCodes.INTERNAL_SERVER_ERROR).json({error: err.message}));
    }

    getDataFromProjectVersion(req, res){
        const {version} = req.params;
        this.service.getDataFromProjectVersion(version)
            .then(data => res.json(data))
            .catch(err => res.status(this.StatusCodes.INTERNAL_SERVER_ERROR).json({error: err.message}));
    }

    testMessage(req, res){
        this.service.testMessage()
            .then(data => res.json(data))
            .catch(err => res.status(this.StatusCodes.INTERNAL_SERVER_ERROR).json({error: err.message}));
    }
}

module.exports = new ModrinthController(service)
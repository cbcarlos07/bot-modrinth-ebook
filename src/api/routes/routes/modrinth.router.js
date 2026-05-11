
const controller = require("../../controllers/modrinth.controller");
const BaseRouter = require("../base.router");

class ModrinthRouter extends BaseRouter{
    
    constructor(controller){
        super(controller)
        this.prefix = '/modrinth';
    }

    init(){
        this.router.patch(`${this.prefix}/projects`, this.controller.getDataFromMultipleProjects.bind(this.controller));
        this.router.get(`${this.prefix}/project/:project`, this.controller.getDataFromProject.bind(this.controller));
        
        return this.router
    }
}

module.exports = new ModrinthRouter( controller )
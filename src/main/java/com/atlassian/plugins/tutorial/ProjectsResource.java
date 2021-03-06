package com.atlassian.plugins.tutorial;

import com.atlassian.jira.permission.ProjectPermissions;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.jira.security.PermissionManager;
import com.atlassian.jira.user.ApplicationUser;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import java.util.Collection;
import java.util.LinkedList;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST resource that provides a list of projects in JSON format.
 */
@Path("/tutorial")
@Named
public class ProjectsResource {

    @ComponentImport
    private PermissionManager permissionManager;
    @ComponentImport
    private JiraAuthenticationContext authenticationContext;

    /**
     * Constructor.
     * @param authenticationContext context that contains authenticated user
     * @param permissionManager the JIRA object which manages permissions for users and projects
     */
    @Inject
    public ProjectsResource(JiraAuthenticationContext authenticationContext,
            PermissionManager permissionManager) {
        this.authenticationContext = authenticationContext;
        this.permissionManager = permissionManager;
    }

    /**
     * Returns the list of projects browsable by the user in the specified request.
     *
     * @param request the context-injected {@code HttpServletRequest}
     * @return a {@code Response} with the marshalled projects
     */
    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getProjects(@Context HttpServletRequest request) {

        ApplicationUser user = authenticationContext.getLoggedInUser();

        // retrieve all objects for projects this user has permission to browse
        Collection<Project> projects =
                permissionManager.getProjects(ProjectPermissions.BROWSE_PROJECTS, user);

        // convert the project objects to ProjectRepresentations
        Collection<ProjectRepresentation> projectRepresentations = new LinkedList<>();
        projects.forEach(project ->  projectRepresentations.add(new ProjectRepresentation(project)));
        ProjectsRepresentation allProjects = new ProjectsRepresentation(projectRepresentations);

        // return the project representations. JAXB will handle the conversion
        // to XML or JSON.
        return Response.ok(allProjects).build();
    }
}


// public MyServlet extends HttpServlet {
     
//     public PageBuilderService pageBuilderService;

//     public MyServlet(PageBuilderService pageBuilderService) 
//     {
//         this.pageBuilderService = pageBuilderService;
//     }

//     public final void doGet(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException 
//     {
//         pageBuilderService.assembler().resources().requireWebResource("com.atlassian.jira.gadgets.jira-gadget-plugin:resources");
//     }
// }
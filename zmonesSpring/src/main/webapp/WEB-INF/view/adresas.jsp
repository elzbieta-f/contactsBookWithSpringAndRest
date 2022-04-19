<%-- 
    Document   : adresas
    Created on : 11 Jan 2022, 19:44:17
    Author     : elzbi
--%>


<%@page import="lt.bit.zmones.data.Adresas"%>
<%@page import="lt.bit.zmones.data.Zmogus"%>
<%@page import="javax.persistence.EntityManager"%>

<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-cache");
%>
<%
    Zmogus z=(Zmogus) request.getAttribute("zmogus");
    if (z==null){
        response.sendRedirect("./zmones");
    }
    Adresas a =(Adresas) request.getAttribute("adresas");
%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <style>
            .link {
                text-decoration: none;
            }
            .btn-width {
                width: 100px;
            }
        </style>
        <title>Adresas</title>
    </head>
    <body>
        <%
            if (a == null) {
        %>
        <div class="bg-secondary">
            <h1 class="text-light p-3">Pridedam naują adresą</h1>
        </div>
        <%
        } else {
        %>
        <div class="bg-secondary">
            <h1 class="text-light p-3">Redaguojam adresą</h1>
        </div>
        <%
            }
        %>
        <div class="bg-secondary">
            <h2 class="text-light p-3"> <%=z.getVardas()%> <%=z.getPavarde()%></h2>
        </div>
        <div class="container">
            <form method="POST" action="save">
                <%
                    if (a != null) {
                %>
                <input type="hidden" name="id" value="<%=a.getId()%>">
                <%
                    }
                %>
                <input type="hidden" name="zmogusId" value="<%=z.getId()%>">
                <div class="row">
                    <div class="mb-3 col-2">        
                        <label for="adresas" class="form-label">Adresas:</label>
                    </div>
                    <div class="mb-3 col-6">   
                        <input id="adresas" name="adresas" value="<%=(a != null && a.getAdresas() != null) ? a.getAdresas() : ""%>"> 
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-2">        
                        <label for="miestas" class="form-label">Miestas:</label>
                    </div>
                    <div class="mb-3 col-6"> 
                        <input id="miestas" name="miestas" value="<%=(a != null && a.getMiestas() != null) ? a.getMiestas() : ""%>">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-2">        
                        <label for="pastoKodas" class="form-label">Pašto kodas:</label>
                    </div>
                    <div class="mb-3 col-6"> 
                        <input id="pastoKodas" name="pastoKodas" value="<%=(a != null && a.getPastoKodas() != null) ? a.getPastoKodas() : ""%>">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-2">
                        <input type="submit" class="btn border border-3 border-success text-success btn-width" value="Save">    
                    </div>
                    <div class="mb-3 btn border border-3 border-danger btn-width col-2" >
                        <a class="link text-danger" href="../adresai?zmogusId=<%=z.getId()%>">Cancel</a>
                    </div>
                </div>
            </form>
        </div>
    </body>
</html>

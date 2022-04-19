

<%@page import="lt.bit.zmones.data.Kontaktas"%>
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
    Kontaktas k =(Kontaktas) request.getAttribute("kontaktas");
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
        <title>JSP Page</title>
    </head>
    <body>
        <%
            if (k == null) {
        %>
        <div class="bg-secondary">
            <h1 class="text-light p-3">Pridedam naują kontaktą</h1>
        </div>
        <%
        } else {
        %>
        <div class="bg-secondary">
            <h1 class="text-light p-3">Redaguojam kontaktą</h1>
        </div>
        <%
            }
        %>
        <div class="bg-secondary">
            <h2 class="text-light p-3"><%=z.getVardas()%> <%=z.getPavarde()%></h2>
        </div>
        <div class="container">
            <form method="POST" action="save">
                <%
                    if (k != null) {
                %>
                <input type="hidden" name="id" value="<%=k.getId()%>">
                <%
                    }
                %>
                <input type="hidden" name="zmogusId" value="<%=z.getId()%>">
                <div class="row">
                    <div class="mb-3 col-2">        
                        <label for="tipas" class="form-label">Tipas:</label>
                    </div>
                    <div class="mb-3 col-6">   
                        <input id="tipas" name="tipas" value="<%=(k != null && k.getTipas() != null) ? k.getTipas() : ""%>">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-2">        
                        <label for="kontaktas" class="form-label">Kontaktas:</label>
                    </div>
                    <div class="mb-3 col-6"> 
                        <input id="kontaktas" name="kontaktas" value="<%=(k != null && k.getKontaktas() != null) ? k.getKontaktas() : ""%>">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-2">
                        <input type="submit" class="btn border border-3 border-success text-success btn-width" value="Saugoti">    
                    </div>
                    <div class="mb-3 btn border border-3 border-danger btn-width col-2" >
                        <a href="./zmones/kontaktai?zmogusId=<%=z.getId()%>" class="link text-danger">Cancel</a>
                    </div>
                </div>
            </form>
        </div>
    </body>
</html>

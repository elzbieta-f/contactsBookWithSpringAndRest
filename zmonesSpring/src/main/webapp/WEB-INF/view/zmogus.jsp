<%-- 
    Document   : zmogus
    Created on : 7 Mar 2022, 00:10:18
    Author     : elzbi
--%>

<%@page import="java.text.SimpleDateFormat"%>
<%@page import="lt.bit.zmones.data.Zmogus"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-cache");
%>
<%
    Zmogus z = (Zmogus) request.getAttribute("zmogus");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    
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
        <title>Žmogaus redagavimas</title>
    </head>
    <body>
        <div class="bg-secondary">
            <h1 class="text-light p-3">Žmogaus duomenų įvedimas/redagavimas</h1>
        </div>
        <div class="container">
            <form action="save" method="POST">
                <%if (z != null) {%>
                <input type="hidden" name="id" value="<%=z.getId()%>">
                <%}%>
                <div class="row">
                    <div class="mb-3 col-2">        
                        <label for="vardas" class="form-label">Vardas:</label>
                    </div>
                    <div class="mb-3 col-6">   
                        <input id="vardas" class="form-text" name="vardas" value="<%= z != null ? z.getVardas() : ""%>">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-2">
                        <label for="pavarde" class="form-label">Pavardė:</label>
                    </div>
                    <div class="mb-3 col-6">
                        <input id="pavarde" class="form-text" name="pavarde" value="<%= z != null ? z.getPavarde() : ""%>">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-2">
                        <label for="gimData" class="form-label">Gimimo data:</label>
                    </div>
                    <div class="mb-3 col-6">
                        <input id="gimData" class="form-text" name="gimimoData" value="<%= z != null && z.getGimimoData() != null ? sdf.format(z.getGimimoData()) : ""%>">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-2">
                        <label for="alga" class="form-label">Alga:</label>
                    </div>
                    <div class="mb-3 col-6">
                        <input id="alga" class="form-text" name="alga" value="<%= z != null && z.getAlga() != null ? z.getAlga() : ""%>">
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-2">
                        <input type="submit" class="btn border border-3 border-success text-success btn-width" value="Save">    
                    </div>
                    <div class="mb-3 btn border border-3 border-danger btn-width col-2" >
                        <a href="../zmones" class="link text-danger">Cancel</a>
                    </div>
                </div>
            </form>
        </div>
    </body>
</html>

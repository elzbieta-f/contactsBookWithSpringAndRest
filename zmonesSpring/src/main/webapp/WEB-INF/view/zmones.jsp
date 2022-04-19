<%@page import="lt.bit.zmones.data.Zmogus"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="javax.persistence.Query"%>
<%@page import="javax.persistence.EntityManager"%>
<%@page import="java.util.regex.Pattern"%>
<%@page import="java.util.List"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-cache");
%>
<%

    List<Zmogus> zmones = (List)request.getAttribute("zmones");
    String filter=(String) request.getAttribute("filter");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <style>
            .link {
                text-decoration: none;
            }
            .mygtukas{
                width: 200px;
            }
        </style>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/9a66ff09af.js" crossorigin="anonymous"></script>
        <title>Žmonių sąrašas</title>
    </head>
    <body>
        <%
            if (zmones.isEmpty()) {
        %>
        <h4>Nėra nė vieno įvesto žmogaus</h4>
        <%
        } else {
        %>
        
<!--        <div class="bg-secondary">
            <h1 class="text-light p-3">Žmogaus duomenų įvedimas/redagavimas</h1>
        </div>-->
        <div class="container" style="width: 50%">
             <form class="p-3">
                <div class="row">              
                    <div class="mb-3 col-6">
                        <input class="form-control" id="filter" class="form-text" name="filter" placeholder="<%= filter != null ? filter : "Ieškoti pagal vardą ar pavardę"%>">
                    </div>
                    <div class="mb-3 col-2"> <input class="btn btn-secondary text-light" type="submit" value="Filtruoti">
                    </div>
                </div>
            </form>
            <h1>Žmonių sąrašas:</h1>
<a href="./zmones/edit" class="link"><div class="btn btn-info mygtukas"><i class="fas fa-user-plus"></i> Naujas žmogus</div></a>
            <table class="table table-striped table-hover">
                <thead class="table-light">
                <th>ID</th>
                <th>Vardas</th>
                <th>Pavardė</th>
                <th>Gimimo data</th>
                <th>Alga</th>
                <th class="text-center">Kontaktai</th>
                <th class="text-center">Adresai</th>
                <th></th>
                <th></th>
                </thead>
                <tbody>
                    <% for (Zmogus zm : zmones) {%>
                    <tr>
                        <td>
                            <%=zm.getId()%>
                        </td>
                        <td>
                            <%=zm.getVardas()%>
                        </td>
                        <td>
                            <%=zm.getPavarde()%>
                        </td>
                        <td>
                            <%=zm.getGimimoData() != null ? sdf.format(zm.getGimimoData()) : ""%>
                        </td>
                        <td>
                            <%=zm.getAlga() != null ? zm.getAlga() : ""%>
                        </td>
                        <td class="text-center"><a class="link text-secondary text-center" href="./zmones/kontaktai?zmogusId=<%=zm.getId()%>"><i class="fas fa-address-book"></i><i class="fas fa-align-justify"></i></a> </td>
                        <td class="text-center"><a class="link text-warning text-center" href="./zmones/adresai?zmogusId=<%=zm.getId()%>"><i class="fas fa-map-marked-alt"></i></a> </td>
                        <td><a href="./zmones/delete?id=<%=zm.getId()%>" class="text-danger link"><i class="fas fa-trash-alt"></i></a></td>
                        <td><a href="./zmones/edit?id=<%=zm.getId()%>" class="text-info link"><i class="fas fa-edit"></i></a></td>
                    </tr>
                    <%}%>
                </tbody>
            </table>
        </div>
        <%}%>
    </body>
</html>

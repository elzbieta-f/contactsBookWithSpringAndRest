<%-- 
    Document   : adresai
    Created on : 11 Jan 2022, 19:36:34
    Author     : elzbi
--%>

<%@page import="lt.bit.zmones.data.Zmogus"%>
<%@page import="lt.bit.zmones.data.Adresas"%>
<%@page import="java.util.List"%>
<%@page import="javax.persistence.EntityManager"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    List<Adresas> adresai = (List) request.getAttribute("adresai");
    String filter = (String) request.getAttribute("filter");
    Zmogus z = (Zmogus) request.getAttribute("zmogus");
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
            .btn-width-100 {
                width: 100px;
            }
            .btn-width-200 {
                width: 200px;
            }
        </style>
        <script src="https://kit.fontawesome.com/9a66ff09af.js" crossorigin="anonymous"></script>
        <title>Adresai</title>
    </head>
    <body>
        <div class="bg-secondary">
            <h1 class="text-light p-3"> <%=z.getVardas()%> <%=z.getPavarde()%> Adresai</h1>
        </div>
        <div class="container">
            <div class="mb-3 btn border border-3 border-primary btn-width-200 col-2" >
                <a href="../zmones/adresai/edit?zmogusId=<%=z.getId()%>" class="link text-primary">Naujas adresas</a></div>
                <%
                    if (adresai.isEmpty()) {
                %>
            <h4>Nėra duomenų</h4>
            <%
            } else {
            %>
            <form class="p-3" >
                <div class="row">       
                    <input type="hidden" name="zmogusId" value="<%=z.getId()%>">
                    <div class="mb-3 col-6">
                        <input class="form-control" id="filter" class="form-text" name="filter" placeholder="<%= filter != null ? filter : "Ieškoti pagal adresą ar miestą"%>">
                    </div>
                    <div class="mb-3 col-2"> <input class="btn btn-secondary text-light" type="submit" value="Filtruoti">
                    </div>
                </div>
            </form>
            <table class="table table-striped table-hover">
                <thead class="table-light">
                <th>ID</th>
                <th>Adresas</th>
                <th>Miestas</th>
                <th>Pašto kodas</th>
                <th></th>
                <th></th>
                </thead>
                <%
                    for (Adresas a : adresai) {
                %>
                <tr>
                    <td><%=a.getId()%></td>
                    <td><%=a.getAdresas()%></td>
                    <td><%=a.getMiestas()%></td>
                    <td><%=a.getPastoKodas()%></td>
                    <td><a class="link text-danger" href="./adresai/delete?id=<%=a.getId()%>"><i class="fas fa-trash-alt"></i></a></td>
                    <td><a class="link text-primary" href="./adresai/edit?id=<%=a.getId()%>&zmogusId=<%=z.getId()%>"><i class="fas fa-edit"></i></a></td>
                </tr>             
                <%
                    }
                %>
                <%
                    }
                %>
            </table>
            <div class="mb-3 btn border border-3 border-primary btn-width-200 col-2" >
                <a href="../zmones" class="link text-primary">Back</a>
            </div>

        </div>
    </body>
</html>

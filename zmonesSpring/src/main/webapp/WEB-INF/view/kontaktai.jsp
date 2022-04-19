
<%@page import="lt.bit.zmones.data.Zmogus"%>
<%@page import="lt.bit.zmones.data.Kontaktas"%>
<%@page import="java.util.List"%>
<%@page import="org.springframework.web.bind.annotation.RequestAttribute"%>
<%@page import="javax.persistence.EntityManager"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    List<Kontaktas> kontaktai = (List) request.getAttribute("kontaktai");
    String filter=(String) request.getAttribute("filter");
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
            .btn-width-300 {
                width: 300px;
            }
        </style>
        <script src="https://kit.fontawesome.com/9a66ff09af.js" crossorigin="anonymous"></script>
        <title>Kontaktai</title>
    </head>
    <body>
        <div class="bg-secondary">
            <h1 class="text-light p-3"> <%=z.getVardas()%> <%=z.getPavarde()%> kontaktai</h1>
        </div>
        <div class="container">
            <div class="mb-3 btn border border-3 border-primary btn-width-300 col-2" >
                <a href="../zmones/kontaktai/edit?zmogusId=<%=z.getId()%>" class="link text-primary">Naujas kontaktas</a>
            </div>
            <%
                if (kontaktai.isEmpty()) {
            %>
            <h4>Nėra duomenų</h4>
            <%
            } else {
            %>
            <form class="p-3" >
                <div class="row">       
                    <input type="hidden" name="zmogusId" value="<%=z.getId()%>">
                    <div class="mb-3 col-6">
                        <input class="form-control" id="filter" class="form-text" name="filter" placeholder="<%= filter != null ? filter : "Ieškoti pagal tipą ar kontaktą"%>">
                    </div>
                    <div class="mb-3 col-2"> <input class="btn btn-secondary text-light" type="submit" value="Filtruoti">
                    </div>
                </div>
            </form>
            
            <table class="table table-striped table-hover">
                <thead class="table-light">
                <th>ID</th>
                <th>Tipas</th>
                <th>Kontaktas</th>
                <th></th>
                <th></th>
                </thead>
                <%
                    for (Kontaktas k : kontaktai) {
                %>
                <tr>
                    <td><%=k.getId()%></td>
                    <td><%=k.getTipas()%></td>
                    <td><%=k.getKontaktas()%></td>
                    <td><a class="link text-danger" href="./kontaktai/delete?id=<%=k.getId()%>"><i class="fas fa-trash-alt"></i></a></td>
                    <td><a class="link text-primary" href="./kontaktai/edit?id=<%=k.getId()%>&zmogusId=<%=z.getId()%>"><i class="fas fa-edit"></i></a></td>
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
    </body>
</html>

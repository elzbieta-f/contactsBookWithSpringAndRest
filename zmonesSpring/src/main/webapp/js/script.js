function cleanElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function showZmones(filter) {
    const d = document.getElementById("data");
    cleanElement(d);
    Zmones.getAll(filter)
            .then(data => {
                const input = document.createElement("input");
                input.id = "filter";
                d.appendChild(input);
                const filterB = document.createElement("button");
                filterB.appendChild(document.createTextNode("Search"));
                filterB.addEventListener("click", () => {
                    showZmones(document.getElementById("filter").value);
                });

                d.appendChild(filterB);
                const table = document.createElement("table");
//                const table = document.createElement("div");
//                let row, btn, col;
                let tr, th, td, button;
                // creating table header

                tr = document.createElement("tr");
                th = document.createElement("th");
//                row = document.createElement("div");
//                row.className = "row p-2 border-bottom";
//                let headers = ["id", "Vardas", "Pavardė", "Gimimo data", "Alga"];
//                for (const prop of headers) {
//                    col = document.createElement("div");
//                    col.appendChild(document.createTextNode(prop));
//                    if (prop === "id" || prop === "Alga") {
//                        col.className = "col-1";
//                    } else {
//                        col.className = "col-2";
//                    }
//                    row.appendChild(col);
//                }
//                let tuscia = document.createElement("div");
//                tuscia.className = "col-4";
//                row.appendChild(tuscia);
//                table.appendChild(row);
                th.appendChild(document.createTextNode("id"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Vadras"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Pavarde"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Gimimo data"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Alga"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Veiksmai"));
                tr.appendChild(th);
                table.appendChild(tr);
//                 creating data table

//                for (let eil of data) {
//                    console.log(eil);
//                    row = document.createElement("div");
//                    eil = document.createElement("div");
//                    eil.className = "row p-2 border-bottom";
//
//                    col = document.createElement("div");
//                    col.appendChild(document.createTextNode((eil["id"]) ? eil["id"] : ""));
//                    col.className = "col-1";
//                    eil.appendChild(col);
//
//                    col = document.createElement("div");
//                    col.appendChild(document.createTextNode((eil.vardas) ? eil.vardas : ""));
//                    col.classList.add("col-2");
//                    eil.appendChild(col);
//
//                    col = document.createElement("div");
//                    col.appendChild(document.createTextNode((eil.pavarde) ? eil.pavarde : ""));
//                    col.classList.add("col-2");
//                    eil.appendChild(col);
//
//                    col = document.createElement("div");
//                    col.appendChild(document.createTextNode((eil.gimimoData) ? eil.gimimoData : ""));
//                    col.classList.add("col-2");
//                    eil.appendChild(col);
//
//                    col = document.createElement("div");
//                    col.appendChild(document.createTextNode((eil.alga) ? eil.alga : ""));
//                    col.classList.add("col-1");
//                    eil.appendChild(col);
//
//                    let control = document.createElement("div");
//                    btn = document.createElement("button");
//                    btn.className = "btn btn-outline-primary";
//                    btn.appendChild(document.createTextNode("Edit"));
//                    btn.zmogusId = eil.id;
//                    btn.addEventListener("click", showZmogus);
//                    control.appendChild(btn);
//                    btn = document.createElement("button");
//                    btn.className = "btn btn-outline-danger";
//                    btn.zmogusId = eil.id;
//                    btn.appendChild(document.createTextNode("Delete"));
//                    btn.addEventListener("click", deleteZmogus);
//                    control.appendChild(btn);
//                    btn = document.createElement("button");
//                    btn.zmogus = eil;
//                    btn.className = "btn btn-outline-secondary";
//                    btn.appendChild(document.createTextNode("Kontaktai"));
//                    btn.addEventListener("click", showKontaktai);
//                    control.appendChild(btn);
//                    btn = document.createElement("button");
//                    btn.zmogus = eil;
//                    btn.className = "btn btn-outline-secondary";
//                    btn.appendChild(document.createTextNode("Adresai"));
//                    btn.addEventListener("click", showAdresai);
//                    control.appendChild(btn);
//
//                    eil.appendChild(control);
//                    row.appendChild(eil);
//                    row.id = "zmogus_" + eil.id;
//                    table.appendChild(row);
                for (const row of data) {
                    tr = document.createElement("tr");
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode(row.id));
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode((row.vardas) ? row.vardas : ""));
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode((row.pavarde) ? row.pavarde : ""));
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode((row.gimimoData) ? row.gimimoData : ""));
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode((row.alga) ? row.alga : ""));
                    tr.appendChild(td);
                    // creating action buttons for each row
                    td = document.createElement("td");
                    button = document.createElement("button");
                    button.appendChild(document.createTextNode("Edit"));
                    button.zmogusId = row.id;
                    button.addEventListener("click", showZmogus);
                    td.appendChild(button);
                    button = document.createElement("button");
                    button.zmogusId = row.id;
                    button.appendChild(document.createTextNode("Delete"));
                    button.addEventListener("click", deleteZmogus);
                    td.appendChild(button);
                    button = document.createElement("button");
                    button.zmogus = row;
                    button.appendChild(document.createTextNode("Kontaktai"));
                    button.addEventListener("click", showKontaktai);
                    td.appendChild(button);
                    button = document.createElement("button");
                    button.zmogus = row;
                    button.appendChild(document.createTextNode("Adresai"));
                    button.addEventListener("click", showAdresai);
                    td.appendChild(button);
                    tr.appendChild(td);
                    table.appendChild(tr);
                }
                d.appendChild(table);
            }
            )
            .catch(err => {
                alert("Failed to load list: " + err.message);
            });
}

function showZmogus(event) {
    if (!event.target && !event.target.zmogusId) {
        return;
    }
    Zmones.getOne(event.target.zmogusId)
            .then(data => {
                formZmogus(data);
            })
            .catch(err => {
                alert("Failed to load entity: " + err.message);
            });
}

function deleteZmogus(event) {
    if (!event.target && !event.target.zmogusId) {
        return;
    }
    Zmones.delete(event.target.zmogusId)
            .then(deleted => {
                if (deleted) {
                    showZmones();
                } else {
                    alert("Nepavyko istrinti");
                }
            })
            .catch(err => {
                alert("Klaida trinant: " + err.message);
            });
}

function formZmogus(zmogus) {
//    const d = document.querySelector("zmogus." + zmogus.id);
    const d = document.getElementById("data");
    cleanElement(d);
    let input;
    d.appendChild(document.createTextNode("Vardas: "));
    input = document.createElement("input");
    input.id = "vardas";
    if (zmogus) {
        input.value = zmogus.vardas;
    }
    d.appendChild(input);
    d.appendChild(document.createElement("br"));
    d.appendChild(document.createTextNode("Pavarde: "));
    input = document.createElement("input");
    input.id = "pavarde";
    if (zmogus) {
        input.value = zmogus.pavarde;
    }
    d.appendChild(input);
    d.appendChild(document.createElement("br"));
    d.appendChild(document.createTextNode("Gimimo data: "));
    input = document.createElement("input");
    input.id = "gimimoData";
    if (zmogus) {
        input.value = zmogus.gimimoData;
    }
    input.type = "date";
    d.appendChild(input);
    d.appendChild(document.createElement("br"));
    d.appendChild(document.createTextNode("Alga: "));
    input = document.createElement("input");
    input.id = "alga";
    if (zmogus) {
        input.value = zmogus.alga;
    }
    input.type = "number";
    d.appendChild(input);
    d.appendChild(document.createElement("br"));

    let bSave = document.createElement("button");
    bSave.appendChild(document.createTextNode("Save"));
    bSave.addEventListener("click", () => {
        const vardas = document.getElementById("vardas").value;
        const pavarde = document.getElementById("pavarde").value;
        let gimimoData = document.getElementById("gimimoData").value;
        let alga = document.getElementById("alga").value;
        const z = {};
        if (!vardas.trim()) {
            alert("Vardas privalomas");
            return;
        }
        z.vardas = vardas.trim();
        if (!pavarde.trim()) {
            alert("Pavarde privaloma");
            return;
        }
        z.pavarde = pavarde.trim();
        if (gimimoData) {
            gimimoData = new Date(gimimoData);
            if (isNaN(gimimoData.getTime())) {
                alert("Neteisinga data");
                return;
            }
            z.gimimoData = gimimoData;
        }
        if (alga) {
            alga = parseFloat(alga);
            if (isNaN(alga)) {
                alert("Neteisinga alga");
                return;
            }
            z.alga = alga;
        }
        let action;
        if (zmogus) {
            z.id = zmogus.id;
            action = Zmones.update(z);
        } else {
            action = Zmones.create(z);
        }
        action
                .then(data => {
                    if (data) {
                        showZmones();
                    } else {
                        alert("Neissaugota");
                    }
                })
                .catch(err => {
                    alert("Klaida issaugojant: " + err.message);
                })
    });
    d.appendChild(bSave);

    let bCancel = document.createElement("button");
    bCancel.appendChild(document.createTextNode("Cancel"));
    bCancel.addEventListener("click", () => {
        showZmones();
    });
    d.appendChild(bCancel);
}

function showKontaktai(event) {
    if (!event.target && !event.target.zmogus) {
        return;
    }
    Kontaktai.getAll(event.target.zmogus.id)
            .then(data => {
                const d = document.getElementById("data");
                cleanElement(d);
                d.appendChild(document.createElement("br"));
                let bBack = document.createElement("button");
                bBack.addEventListener("click", () => {
                    showZmones();
                });
                bBack.appendChild(document.createTextNode("Back"));
                d.appendChild(bBack);
                const h3 = document.createElement("h3");
                h3.appendChild(document.createTextNode(`${event.target.zmogus.vardas} ${event.target.zmogus.pavarde} kontaktu sarasas`));
                d.appendChild(h3);
                let bAdd = document.createElement("button");
                bAdd.addEventListener("click", () => {
                    formKontaktas(event.target.zmogus);
                });
                bAdd.appendChild(document.createTextNode("Add"));
                d.appendChild(bAdd);
                const table = document.createElement("table");
                let tr, th, td, button;
                // creating table header
                tr = document.createElement("tr");
                th = document.createElement("th");
                th.appendChild(document.createTextNode("id"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Tipas"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Kontaktas"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Veiksmai"));
                tr.appendChild(th);
                table.appendChild(tr);
                // creating data table
                for (const row of data) {
                    tr = document.createElement("tr");
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode(row.id));
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode((row.tipas) ? row.tipas : ""));
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode((row.kontaktas) ? row.kontaktas : ""));
                    tr.appendChild(td);
                    // creating action buttons for each row
                    td = document.createElement("td");
                    button = document.createElement("button");
                    button.appendChild(document.createTextNode("Edit"));
                    button.zmogus = row.zmogus;
                    button.kontaktasId = row.id;
                    button.addEventListener("click", showKontaktas);
                    td.appendChild(button);
                    button = document.createElement("button");
                    button.zmogus = row.zmogus;
                    button.kontaktasId = row.id;
                    button.appendChild(document.createTextNode("Delete"));
                    button.addEventListener("click", deleteKontaktas);
                    td.appendChild(button);
                    tr.appendChild(td);
                    table.appendChild(tr);
                }
                d.appendChild(table);
            })
            .catch(err => {
                alert("Failed to load list: " + err.message);
            });
}

function showKontaktas(event) {
    if (!event.target && !event.target.zmogus && !event.target.kontaktasId) {
        return;
    }
    Kontaktai.getOne(event.target.zmogus.id, event.target.kontaktasId)
            .then(data => {
                formKontaktas(data.zmogus, data);
            })
            .catch(err => {
                alert("Failed to load entity: " + err.message);
            });

}

function deleteKontaktas(event) {
    if (!event.target && !event.target.zmogus && !event.target.kontaktasId) {
        return;
    }
    Kontaktai.delete(event.target.zmogus.id, event.target.kontaktasId)
            .then(deleted => {
                if (deleted) {
                    showKontaktai(event);
                } else {
                    alert("Nepavyko istrinti");
                }
            })
            .catch(err => {
                alert("Klaida trinant: " + err.message);
            });
}

function formKontaktas(zmogus, kontaktas) {
    const d = document.getElementById("data");
    cleanElement(d);
    const h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(`${zmogus.vardas} ${zmogus.pavarde} kontaktas`));
    d.appendChild(h3);
    let input;
    d.appendChild(document.createTextNode("Tipas: "));
    input = document.createElement("input");
    input.id = "tipas";
    if (kontaktas) {
        input.value = kontaktas.tipas;
    }
    d.appendChild(input);
    d.appendChild(document.createElement("br"));
    d.appendChild(document.createTextNode("Kontaktas: "));
    input = document.createElement("input");
    input.id = "kontaktas";
    if (kontaktas) {
        input.value = kontaktas.kontaktas;
    }
    d.appendChild(input);
    d.appendChild(document.createElement("br"));

    let bSave = document.createElement("button");
    bSave.appendChild(document.createTextNode("Save"));
    bSave.addEventListener("click", () => {
        const tipas = document.getElementById("tipas").value;
        const kontakt = document.getElementById("kontaktas").value;
        const k = {};
        if (!tipas.trim()) {
            alert("Tipas privalomas");
            return;
        }
        k.tipas = tipas.trim();
        if (!kontakt.trim()) {
            alert("Kontaktas privalomas");
            return;
        }
        k.kontaktas = kontakt.trim();
        let action;
        if (kontaktas) {
            k.id = kontaktas.id;
            action = Kontaktai.update(zmogus.id, k);
        } else {
            action = Kontaktai.create(zmogus.id, k);
        }
        action
                .then(data => {
                    if (data) {
                        showKontaktai({target: {zmogus}});
                    } else {
                        alert("Neissaugota");
                    }
                })
                .catch(err => {
                    alert("Klaida issaugojant: " + err.message);
                })
    });
    d.appendChild(bSave);

    let bCancel = document.createElement("button");
    bCancel.appendChild(document.createTextNode("Cancel"));
    bCancel.addEventListener("click", () => {
        showKontaktai({target: {zmogus}});
    });
    d.appendChild(bCancel);
}




function showAdresai(event) {
    if (!event.target && !event.target.zmogus) {
        return;
    }
    Adresai.getAll(event.target.zmogus.id)
            .then(data => {
                const d = document.getElementById("data");
                cleanElement(d);
                d.appendChild(document.createElement("br"));
                let bBack = document.createElement("button");
                bBack.addEventListener("click", () => {
                    showZmones();
                });
                bBack.appendChild(document.createTextNode("Back"));
                d.appendChild(bBack);
                const h3 = document.createElement("h3");
                h3.appendChild(document.createTextNode(`${event.target.zmogus.vardas} ${event.target.zmogus.pavarde} adresu sarasas`));
                d.appendChild(h3);
                let bAdd = document.createElement("button");
                bAdd.addEventListener("click", () => {
                    formAdresas(event.target.zmogus);
                });
                bAdd.appendChild(document.createTextNode("Add"));
                d.appendChild(bAdd);
                const table = document.createElement("table");
                let tr, th, td, button;
                // creating table header
                tr = document.createElement("tr");
                th = document.createElement("th");
                th.appendChild(document.createTextNode("id"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Adresas"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Miestas"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Pasto kodas"));
                tr.appendChild(th);
                th = document.createElement("th");
                th.appendChild(document.createTextNode("Veiksmai"));
                tr.appendChild(th);
                table.appendChild(tr);
                // creating data table
                for (const row of data) {
                    tr = document.createElement("tr");
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode(row.id));
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode((row.adresas) ? row.adresas : ""));
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode((row.miestas) ? row.miestas : ""));
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.appendChild(document.createTextNode((row.pastoKodas) ? row.pastoKodas : ""));
                    tr.appendChild(td);
                    // creating action buttons for each row
                    td = document.createElement("td");
                    button = document.createElement("button");
                    button.appendChild(document.createTextNode("Edit"));
                    button.zmogus = row.zmogus;
                    button.adresasId = row.id;
                    button.addEventListener("click", showAdresas);
                    td.appendChild(button);
                    button = document.createElement("button");
                    button.zmogus = row.zmogus;
                    button.adresasId = row.id;
                    button.appendChild(document.createTextNode("Delete"));
                    button.addEventListener("click", deleteAdresas);
                    td.appendChild(button);
                    tr.appendChild(td);
                    table.appendChild(tr);
                }
                d.appendChild(table);
            })
            .catch(err => {
                alert("Failed to load list: " + err.message);
            });
}

function showAdresas(event) {
    if (!event.target && !event.target.zmogus && !event.target.adresasId) {
        return;
    }
    Adresai.getOne(event.target.zmogus.id, event.target.adresasId)
            .then(data => {
                formAdresas(data.zmogus, data);
            })
            .catch(err => {
                alert("Failed to load entity: " + err.message);
            });

}

function deleteAdresas(event) {
    if (!event.target && !event.target.zmogus && !event.target.adresasId) {
        return;
    }
    Adresai.delete(event.target.zmogus.id, event.target.adresasId)
            .then(deleted => {
                if (deleted) {
                    showAdresai(event);
                } else {
                    alert("Nepavyko istrinti");
                }
            })
            .catch(err => {
                alert("Klaida trinant: " + err.message);
            });
}

function formAdresas(zmogus, adresas) {
    const d = document.getElementById("data");
    cleanElement(d);
    const h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(`${zmogus.vardas} ${zmogus.pavarde} adresas`));
    d.appendChild(h3);
    let input;
    d.appendChild(document.createTextNode("Adresas: "));
    input = document.createElement("input");
    input.id = "adresas";
    if (adresas) {
        input.value = adresas.adresas;
    }
    d.appendChild(input);
    d.appendChild(document.createElement("br"));
    d.appendChild(document.createTextNode("Miestas: "));
    input = document.createElement("input");
    input.id = "miestas";
    if (adresas) {
        input.value = adresas.miestas;
    }
    d.appendChild(input);
    d.appendChild(document.createElement("br"));
    d.appendChild(document.createTextNode("Pasto kodas: "));
    input = document.createElement("input");
    input.id = "pastoKodas";
    if (adresas) {
        input.value = adresas.pastoKodas;
    }
    d.appendChild(input);
    d.appendChild(document.createElement("br"));

    let bSave = document.createElement("button");
    bSave.appendChild(document.createTextNode("Save"));
    bSave.addEventListener("click", () => {
        const addr = document.getElementById("adresas").value;
        const miestas = document.getElementById("miestas").value;
        const pastoKodas = document.getElementById("pastoKodas").value;
        const a = {};
        if (!addr.trim()) {
            alert("Adresas privalomas");
            return;
        }
        a.adresas = addr.trim();
        if (!miestas.trim()) {
            alert("Miestas privalomas");
            return;
        }
        a.miestas = miestas.trim();
        if (pastoKodas.trim()) {
            a.pastoKodas = pastoKodas.trim();
        }
        let action;
        if (adresas) {
            a.id = adresas.id;
            action = Adresai.update(zmogus.id, a);
        } else {
            action = Adresai.create(zmogus.id, a);
        }
        action
                .then(data => {
                    if (data) {
                        showAdresai({target: {zmogus}});
                    } else {
                        alert("Neissaugota");
                    }
                })
                .catch(err => {
                    alert("Klaida issaugojant: " + err.message);
                })
    });
    d.appendChild(bSave);

    let bCancel = document.createElement("button");
    bCancel.appendChild(document.createTextNode("Cancel"));
    bCancel.addEventListener("click", () => {
        showAdresai({target: {zmogus}});
    });
    d.appendChild(bCancel);
}

package lt.bit.zmones.controller;

import java.util.List;
import java.util.Optional;
import lt.bit.zmones.dao.KontaktasDAO;
import lt.bit.zmones.dao.ZmogusDAO;
import lt.bit.zmones.data.Kontaktas;
import lt.bit.zmones.data.Zmogus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "rest/zmogus/{zmogusId}/kontaktas")
public class KontaktaiRest {

    @Autowired
    private ZmogusDAO zmogusDAO;

    @Autowired
    private KontaktasDAO kontaktasDAO;

    @GetMapping
    public List<Kontaktas> getAll(
            @PathVariable("zmogusId") Long zmogusId
    ) {
        Optional<Zmogus> oz = zmogusDAO.findById(zmogusId);
        if (oz.isEmpty()) {
            throw new NotFoundException();
        }
        Zmogus z = oz.get();
        return kontaktasDAO.getByZmogus(z);
    }

    @GetMapping(path = "{id}")
    public Kontaktas getOne(
            @PathVariable("zmogusId") Long zmogusId,
            @PathVariable("id") Long id) {
        Optional<Zmogus> oz = zmogusDAO.findById(zmogusId);
        if (oz.isEmpty()) {
            throw new NotFoundException();
        }
        Zmogus z = oz.get();
        Optional<Kontaktas> ok = kontaktasDAO.findById(id);
        if (ok.isEmpty()) {
            throw new NotFoundException();
        }
        Kontaktas k = ok.get();
        if (!k.getZmogus().equals(z)) {
            throw new NotFoundException();
        }
        System.out.println(k);
        return k;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public Kontaktas create(
            @PathVariable("zmogusId") Long zmogusId,
            @RequestBody Kontaktas kontaktas) {
        Optional<Zmogus> oz = zmogusDAO.findById(zmogusId);
        if (oz.isEmpty()) {
            throw new NotFoundException();
        }
        Zmogus z = oz.get();
        kontaktas.setZmogus(z);
        kontaktasDAO.save(kontaktas);
        return kontaktas;
    }

    @PutMapping(path = "{id}")
    @Transactional
    public Kontaktas update(
            @PathVariable("id") Long id,
            @PathVariable("zmogusId") Long zmogusId,
            @RequestBody Kontaktas kontaktas) {
        Optional<Zmogus> oz = zmogusDAO.findById(zmogusId);
        if (oz.isEmpty()) {
            throw new NotFoundException();
        }
        Zmogus z = oz.get();

        Optional<Kontaktas> ok = kontaktasDAO.findById(id);
        if (ok.isEmpty() || !ok.get().equals(kontaktas)) {
            throw new NotFoundException();
        }
        Kontaktas k = ok.get();
        if (!k.getZmogus().equals(z)) {
            throw new NotFoundException();
        }

        k.setTipas(kontaktas.getTipas());
        k.setKontaktas(kontaktas.getKontaktas());

        return kontaktas;
    }

    @DeleteMapping(path = "{id}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public void delete(
            @PathVariable("zmogusId") Long zmogusId,
            @PathVariable("id") Long id) {
        Optional<Zmogus> oz = zmogusDAO.findById(zmogusId);
        if (oz.isEmpty()) {
            throw new NotFoundException();
        }
        Zmogus z = oz.get();
        Optional<Kontaktas> ok = kontaktasDAO.findById(id);
        if (ok.isEmpty()) {
            throw new NotFoundException();
        }
        Kontaktas k = ok.get();
        if (!k.getZmogus().equals(z)) {
            throw new NotFoundException();
        }
        kontaktasDAO.delete(k);
    }
}

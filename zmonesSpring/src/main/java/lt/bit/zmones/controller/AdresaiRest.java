package lt.bit.zmones.controller;

import java.util.List;
import java.util.Optional;
import lt.bit.zmones.dao.AdresasDAO;
import lt.bit.zmones.dao.KontaktasDAO;
import lt.bit.zmones.dao.ZmogusDAO;
import lt.bit.zmones.data.Adresas;
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
@RequestMapping(path = "rest/zmogus/{zmogusId}/adresas")

public class AdresaiRest {

    @Autowired
    private ZmogusDAO zmogusDAO;

    @Autowired
    private AdresasDAO adresasDAO;

    @GetMapping
    public List<Adresas> getAll(
            @PathVariable("zmogusId") Long zmogusId
    ) {
        Optional<Zmogus> oz = zmogusDAO.findById(zmogusId);
        if (oz.isEmpty()) {
            throw new NotFoundException();
        }
        Zmogus z = oz.get();
        return adresasDAO.getByZmogus(z);
    }

    @GetMapping(path = "{id}")
    public Adresas getOne(
            @PathVariable("zmogusId") Long zmogusId,
            @PathVariable("id") Long id) {
        Optional<Zmogus> oz = zmogusDAO.findById(zmogusId);
        if (oz.isEmpty()) {
            throw new NotFoundException();
        }
        Zmogus z = oz.get();
        Optional<Adresas> oa = adresasDAO.findById(id);
        if (oa.isEmpty()) {
            throw new NotFoundException();
        }
        Adresas a = oa.get();
        if (!a.getZmogus().equals(z)) {
            throw new NotFoundException();
        }
        System.out.println(a);
        return a;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public Adresas create(
            @PathVariable("zmogusId") Long zmogusId,
            @RequestBody Adresas adresas) {
        Optional<Zmogus> oz = zmogusDAO.findById(zmogusId);
        if (oz.isEmpty()) {
            throw new NotFoundException();
        }
        Zmogus z = oz.get();
        adresas.setZmogus(z);
        adresasDAO.save(adresas);
        return adresas;
    }

    @PutMapping(path = "{id}")
    @Transactional
    public Adresas update(
            @PathVariable("id") Long id,
            @PathVariable("zmogusId") Long zmogusId,
            @RequestBody Adresas adresas) {
        Optional<Zmogus> oz = zmogusDAO.findById(zmogusId);
        if (oz.isEmpty()) {
            throw new NotFoundException();
        }
        Zmogus z = oz.get();

        Optional<Adresas> oa = adresasDAO.findById(id);
        if (oa.isEmpty() || !oa.get().equals(adresas)) {
            throw new NotFoundException();
        }
        Adresas a = oa.get();
        if (!a.getZmogus().equals(z)) {
            throw new NotFoundException();
        }

        a.setAdresas(adresas.getAdresas());
        a.setMiestas(adresas.getMiestas());
        a.setPastoKodas(adresas.getPastoKodas());

        return adresas;
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
        Optional<Adresas> oa = adresasDAO.findById(id);
        if (oa.isEmpty()) {
            throw new NotFoundException();
        }
        Adresas a = oa.get();
        if (!a.getZmogus().equals(z)) {
            throw new NotFoundException();
        }
        adresasDAO.delete(a);
    }
}

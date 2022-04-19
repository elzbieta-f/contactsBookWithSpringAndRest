package lt.bit.zmones.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import lt.bit.zmones.dao.AdresasDAO;
import lt.bit.zmones.dao.KontaktasDAO;
import lt.bit.zmones.dao.ZmogusDAO;
import lt.bit.zmones.data.Adresas;
import lt.bit.zmones.data.Kontaktas;
import lt.bit.zmones.data.Zmogus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(path = "zmones")
public class ZmonesController {

    @Autowired
    private ZmogusDAO zmogusDAO;

    @Autowired
    private KontaktasDAO kontaktasDAO;
    
    @Autowired
    private AdresasDAO adresasDAO;

    @GetMapping
    public ModelAndView sarasas(@RequestParam(value = "filter", required = false) String filter) {
        List<Zmogus> list;
        if (filter == null || filter.isBlank()) {
            list = zmogusDAO.findAll();
        } else {
            filter = "%" + filter + "%";
            list = zmogusDAO.filter(filter, filter);

        }
        ModelAndView mv = new ModelAndView("zmones");
        mv.addObject("zmones", list);
        return mv;
    }

    @GetMapping(path = "edit")
    public ModelAndView redagavimas(@RequestParam(value = "id", required = false) Long id) {
        ModelAndView mv = new ModelAndView("zmogus");
        if (id != null) {
            Zmogus z = zmogusDAO.getById(id);
            mv.addObject("zmogus", z);
        }
        return mv;
    }

    @PostMapping(path = "save")
    @Transactional
    public String issaugojimas(@RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "vardas") String vardas,
            @RequestParam(value = "pavarde") String pavarde,
            @RequestParam(value = "gimimoData") String gimimoDataStr,
            @RequestParam(value = "alga", required = false) BigDecimal alga) {
        Zmogus z;
        if (id != null) {
            z = zmogusDAO.getById(id);
        } else {
            z = new Zmogus();
        }
        z.setVardas(vardas);
        z.setPavarde(pavarde);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date gimimoData;
        try {
            gimimoData = sdf.parse(gimimoDataStr);
        } catch (Exception ex) {
            gimimoData = null;
        }
        z.setGimimoData(gimimoData);
        z.setAlga(alga);
        if (id == null) {
            zmogusDAO.save(z);
        }

        return "redirect:../zmones";
    }

    @GetMapping(path = "delete")
    @Transactional
    public String delete(@RequestParam(value = "id") Long id) {
        Zmogus z = zmogusDAO.getById(id);
        zmogusDAO.delete(z);
        return "redirect:../zmones";
    }

    @GetMapping(path = "kontaktai")
    public ModelAndView sarasas(@RequestParam("zmogusId") Long ZmogusId, @RequestParam(value = "filter", required = false) String filter) {
        Zmogus zmogus = zmogusDAO.getById(ZmogusId);
        List<Kontaktas> list = null;
        if (filter == null || filter.isBlank()) {
            list = kontaktasDAO.getByZmogus(zmogus);
        } else {
            filter = "%" + filter + "%";
            list = kontaktasDAO.getByZmogusFilter(zmogus, filter);
        }

        ModelAndView mv = new ModelAndView("kontaktai");
        mv.addObject("kontaktai", list);

        mv.addObject("zmogus", zmogus);
        return mv;

    }

    @GetMapping(path = "kontaktai/edit")
    public ModelAndView redagavimas(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "zmogusId") Long zmogusId) {
        ModelAndView mv = new ModelAndView("kontaktas");
        Zmogus z = zmogusDAO.getById(zmogusId);
        mv.addObject("zmogus", z);
        if (id != null) {
            Kontaktas k = kontaktasDAO.getById(id);
            mv.addObject("kontaktas", k);
        }
        return mv;
    }

    @PostMapping(path = "kontaktai/save")
    @Transactional
    public String issaugojimas(@RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "zmogusId") Long zmogusId,
            @RequestParam(value = "tipas") String tipas,
            @RequestParam(value = "kontaktas") String kontaktas
    ) {
        Zmogus z = zmogusDAO.getById(zmogusId);
        if (z == null) {
            return "redirect:../zmones";
        }
        Kontaktas k;
        if (id != null) {
            k = kontaktasDAO.getById(id);
            if (k.getZmogus() != z) {
                return "redirect:../zmones";
            }
        } else {
            k = new Kontaktas();
            k.setZmogus(z);
        }
        k.setTipas(tipas);
        k.setKontaktas(kontaktas);

        if (id == null) {
            kontaktasDAO.save(k);
        }

        return "redirect:../kontaktai?zmogusId=" + z.getId();
    }

    @GetMapping(path = "kontaktai/delete")
    @Transactional
    public String deleteKontaktas(@RequestParam(value = "id") Long id) {

        Kontaktas k = kontaktasDAO.getById(id);
        Zmogus z = k.getZmogus();
        kontaktasDAO.delete(k);
        return "redirect:../kontaktai?zmogusId=" + z.getId();
    }
    
    @GetMapping(path = "adresai")
    public ModelAndView adresai(@RequestParam("zmogusId") Long ZmogusId, @RequestParam(value = "filter", required = false) String filter) {
        Zmogus zmogus = zmogusDAO.getById(ZmogusId);
        List<Adresas> list = null;
        if (filter == null || filter.isBlank()) {
            list = adresasDAO.getByZmogus(zmogus);
        } else {
            filter = "%" + filter + "%";
            list = adresasDAO.getByZmogusFilter(zmogus, filter);
        }

        ModelAndView mv = new ModelAndView("adresai");
        mv.addObject("adresai", list);

        mv.addObject("zmogus", zmogus);
        return mv;

    }

    @GetMapping(path = "adresai/edit")
    public ModelAndView adresaiEdit(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "zmogusId") Long zmogusId) {
        ModelAndView mv = new ModelAndView("adresas");
        Zmogus z = zmogusDAO.getById(zmogusId);
        mv.addObject("zmogus", z);
        if (id != null) {
            Adresas a = adresasDAO.getById(id);
            mv.addObject("adresas", a);
        }
        return mv;
    }

    @PostMapping(path = "adresai/save")
    @Transactional
    public String saveAdresas(@RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "zmogusId") Long zmogusId,
            @RequestParam(value = "adresas") String adresas,
            @RequestParam(value = "miestas") String miestas,
            @RequestParam(value = "pastoKodas") String pastoKodas
    ) {
        Zmogus z = zmogusDAO.getById(zmogusId);
        if (z == null) {
            return "redirect:../zmones";
        }
        Adresas a;
        if (id != null) {
            a = adresasDAO.getById(id);
            if (a.getZmogus() != z) {
                return "redirect:../zmones";
            }
        } else {
            a = new Adresas();
            a.setZmogus(z);
        }
        a.setAdresas(adresas);
        a.setMiestas(miestas);
        a.setPastoKodas(pastoKodas);

        if (id == null) {
            adresasDAO.save(a);
        }

        return "redirect:../adresai?zmogusId=" + z.getId();
    }

    @GetMapping(path = "adresai/delete")
    @Transactional
    public String deleteAdresas(@RequestParam(value = "id") Long id) {

        Adresas a = adresasDAO.getById(id);
        Zmogus z = a.getZmogus();
        adresasDAO.delete(a);
        return "redirect:../adresai?zmogusId=" + z.getId();
    }

}

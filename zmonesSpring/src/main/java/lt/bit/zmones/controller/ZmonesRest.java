
package lt.bit.zmones.controller;

import java.util.List;
import java.util.Optional;
import lt.bit.zmones.dao.ZmogusDAO;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/rest/zmogus")
public class ZmonesRest {
    @Autowired
    private ZmogusDAO zmogusDAO;
    
    @GetMapping
    public List<Zmogus> getAll(
            @RequestParam(value = "filter", required = false) String filter
    ){
        
        if (filter == null || "".equals(filter)) {
            return zmogusDAO.findAll();
        }
        filter = "%" + filter + "%";
        return zmogusDAO.filter(filter, filter);
    }
    
    @GetMapping(path="{id}")
    public Zmogus getOne(@PathVariable("id")Long id){
        Optional<Zmogus>oz=zmogusDAO.findById(id);
        if (oz.isEmpty()){
             throw new NotFoundException();
        }
        return oz.get();
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public Zmogus create(@RequestBody Zmogus zmogus){
    zmogusDAO.save(zmogus);
    return zmogus;
}
    @PutMapping(path="{id}")
    @Transactional
    public Zmogus update(
            @PathVariable("id")Long id,
            @RequestBody Zmogus zmogus){
        Optional <Zmogus>oz=zmogusDAO.findById(id);
        if (oz.isEmpty()){
            throw new NotFoundException();
        }
        Zmogus z=oz.get();
        z.setVardas(zmogus.getVardas());
        z.setPavarde(zmogus.getPavarde());
        z.setGimimoData(zmogus.getGimimoData());
        z.setAlga(zmogus.getAlga());
        
        return zmogus;
    }
    
    @DeleteMapping(path="{id}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public void delete(
            @PathVariable("id")Long id){
        Optional<Zmogus>oz=zmogusDAO.findById(id);
        if (oz.isEmpty()){
            throw new NotFoundException();
        }
        zmogusDAO.delete(oz.get());
    }
}

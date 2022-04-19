package lt.bit.zmones.dao;

import java.util.List;
import lt.bit.zmones.data.Kontaktas;
import lt.bit.zmones.data.Zmogus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KontaktasDAO extends JpaRepository<Kontaktas, Long> {

    @Query("select k from Kontaktas k where k.zmogus= :zmogus")
    public List<Kontaktas> getByZmogus(@Param("zmogus") Zmogus zmogus);
    
    @Query("select k from Kontaktas k where k.zmogus= :zmogus and (k.tipas like :filter or k.kontaktas like :filter)")
    public List<Kontaktas> getByZmogusFilter(@Param("zmogus") Zmogus zmogus, @Param("filter") String filter);

    @Query("select k from Kontaktas k where k.tipas= :tipas")
    public List<Kontaktas> getByTipas(@Param("tipas") String tipas);

    @Query("select k from Kontaktas k where k.zmogus= :zmogus and k.tipas= :tipas")
    public List<Kontaktas> getByZmogusIrTipas(@Param("zmogus") Zmogus zmogus, @Param("tipas") String tipas);



}

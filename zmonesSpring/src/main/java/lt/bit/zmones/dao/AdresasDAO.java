
package lt.bit.zmones.dao;

import java.util.List;
import lt.bit.zmones.data.Adresas;
import lt.bit.zmones.data.Zmogus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface AdresasDAO extends JpaRepository <Adresas, Long> {
    @Query("select a from Adresas a where a.zmogus= :zmogus")
    public List<Adresas>getByZmogus(@Param("zmogus") Zmogus zmogus);
    
     @Query("select a from Adresas a where a.zmogus= :zmogus and (a.miestas like :filter or a.adresas like :filter)")
    public List<Adresas> getByZmogusFilter(@Param("zmogus") Zmogus zmogus, @Param("filter") String filter);
}


package lt.bit.zmones.dao;

import java.util.List;
import lt.bit.zmones.data.Zmogus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ZmogusDAO extends JpaRepository <Zmogus, Long> {
    //spring praskanuoja xml faile nurodytą package(jpa:repository ...), randa interface extends JpaRepository 
    //on the fly sukuria klasę kuri implementina šitą interface ir padeda į application context
    @Query("select z from Zmogus z where UPPER(z.vardas) like UPPER(:vardas) or UPPER(z.pavarde) like UPPER(:pavarde)")
    public List<Zmogus>filter(@Param("vardas") String vardas, @Param("pavarde") String pavarde);
}

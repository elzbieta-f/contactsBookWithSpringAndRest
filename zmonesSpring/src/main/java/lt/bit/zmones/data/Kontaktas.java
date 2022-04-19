package lt.bit.zmones.data;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "kontaktai")
public class Kontaktas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @Column(name="zmogus_id", updatable = false, insertable = false)
//    private Long zmogusId;
    @ManyToOne
    @JoinColumn(name="zmogus_id")
    private Zmogus zmogus;
    private String tipas;
    private String kontaktas;

    public Kontaktas() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Zmogus getZmogus() {
        return zmogus;
    }

    public void setZmogus(Zmogus zmogus) {
        this.zmogus = zmogus;
    }
    
    public String getTipas() {
        return tipas;
    }

    public void setTipas(String tipas) {
        this.tipas = tipas;
    }

    public String getKontaktas() {
        return kontaktas;
    }

    public void setKontaktas(String kontaktas) {
        this.kontaktas = kontaktas;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Kontaktas other = (Kontaktas) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "Kontaktas{" + "id=" + id + ", zmogus=" + zmogus + ", tipas=" + tipas + ", kontaktas=" + kontaktas + '}';
    }

    
}

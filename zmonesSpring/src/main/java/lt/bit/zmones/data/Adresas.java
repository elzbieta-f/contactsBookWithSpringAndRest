package lt.bit.zmones.data;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="adresai")
public class Adresas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="zmogus_id")
    private Zmogus zmogus;
    private String adresas;
    private String miestas;
    @Column(name="pasto_kodas")
    private String pastoKodas;

    public Adresas() {
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
    
    public String getAdresas() {
        return adresas;
    }

    public void setAdresas(String adresas) {
        this.adresas = adresas;
    }

    public String getMiestas() {
        return miestas;
    }

    public void setMiestas(String miestas) {
        this.miestas = miestas;
    }

    public String getPastoKodas() {
        return pastoKodas;
    }

    public void setPastoKodas(String pastoKodas) {
        this.pastoKodas = pastoKodas;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + Objects.hashCode(this.id);
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
        final Adresas other = (Adresas) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "Adresas{" + "id=" + id + ", zmogus=" + zmogus + ", adresas=" + adresas + ", miestas=" + miestas + ", pastoKodas=" + pastoKodas + '}';
    }

}

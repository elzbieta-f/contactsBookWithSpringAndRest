package lt.bit.zmones.data;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "zmones")
public class Zmogus {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vardas;
    private String pavarde;
    @Column(name = "gim_data")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date gimimoData;
    private BigDecimal alga;
    @OneToMany(mappedBy = "zmogus")
//    @JoinColumn(name = "zmogus_id")
    @JsonIgnore
    private List<Adresas> adresai;

    @OneToMany(mappedBy = "zmogus")
//    @JoinColumn(name = "zmogus_id")
    @JsonIgnore
    private List<Kontaktas> kontaktai;
    
    public Zmogus() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVardas() {
        return vardas;
    }

    public void setVardas(String vardas) {
        this.vardas = vardas;
    }

    public String getPavarde() {
        return pavarde;
    }

    public void setPavarde(String pavarde) {
        this.pavarde = pavarde;
    }

    public Date getGimimoData() {
        return gimimoData;
    }

    public void setGimimoData(Date gimimoData) {
        this.gimimoData = gimimoData;
    }

    public BigDecimal getAlga() {
        return alga;
    }

    public void setAlga(BigDecimal alga) {
        this.alga = alga;
    }

    public List<Adresas> getAdresai() {
        return adresai;
    }

    public void setAdresai(List<Adresas> adresai) {
        this.adresai = adresai;
    }

    public List<Kontaktas> getKontaktai() {
        return kontaktai;
    }

    public void setKontaktai(List<Kontaktas> kontaktai) {
        this.kontaktai = kontaktai;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 17 * hash + Objects.hashCode(this.id);
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
        final Zmogus other = (Zmogus) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "Zmogus{" + "id=" + id + ", vardas=" + vardas + ", pavarde=" + pavarde + ", gimimoData=" + gimimoData + ", alga=" + alga + '}';
    }

    
}

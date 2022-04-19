
package lt.bit.zmones.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/")
public class StartController {

    @GetMapping
    public String index() {
        return "index";
    }

}

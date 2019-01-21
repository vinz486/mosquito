package open.mind.jspoet.generator;

import java.io.IOException;

import javax.annotation.processing.Filer;
import javax.lang.model.element.Element;


public interface JsPoetGenerator
{
    void generate(Filer filer, Element element) throws IOException;
}

package open.mind.jspoet.generator;

import java.io.IOException;

import javax.annotation.processing.Filer;
import javax.lang.model.element.Element;
import javax.tools.FileObject;
import javax.tools.StandardLocation;


public class JsPoem extends AbstractJsPoetGenerator
{
    @Override
    public void generate(Filer filer, Element element) throws IOException
    {

        FileObject resource = filer.createResource(StandardLocation.SOURCE_OUTPUT, "", element.getSimpleName() + ".js");

        resource.openWriter().append("{ //" + element.getSimpleName() + " }").close();

    }
}

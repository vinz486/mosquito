package open.mind.jspoet.processor;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.Filer;
import javax.annotation.processing.Messager;
import javax.annotation.processing.ProcessingEnvironment;
import javax.lang.model.element.TypeElement;
import javax.tools.Diagnostic;


public abstract class AbstractJsPoetProcessor extends AbstractProcessor
{
    public static final String PACKEGE_API = ".api.";

    public static final String PACKAGE_GENERATOR = ".generator.";

    private Messager messager;

    private Filer filer;

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv)
    {
        super.init(processingEnv);

        messager = processingEnv.getMessager();

        filer = processingEnv.getFiler();
    }

    public Filer getFiler()
    {
        return filer;
    }

    protected String buildGeneratorClass(TypeElement annotation)
    {
        return annotation.getQualifiedName().toString().replace(PACKEGE_API, PACKAGE_GENERATOR);
    }

    protected void log(String message)
    {
        messager.printMessage(Diagnostic.Kind.NOTE, message);
    }

    protected void err(String message)
    {
        messager.printMessage(Diagnostic.Kind.ERROR, message);
    }
}

package open.mind.jspoet.processor;

import java.io.IOException;
import java.util.Set;

import javax.annotation.processing.Processor;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.annotation.processing.SupportedSourceVersion;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.TypeElement;

import com.google.auto.service.AutoService;

import open.mind.jspoet.generator.JsPoetGenerator;


@AutoService(Processor.class)
@SupportedAnnotationTypes("open.mind.jspoet.api.*")
@SupportedSourceVersion(SourceVersion.RELEASE_8)
public class JsPoetProcessor extends AbstractJsPoetProcessor
{
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv)
    {
        for (TypeElement annotation : annotations)
        {
            Set<? extends Element> annotatedElements = roundEnv.getElementsAnnotatedWith(annotation);

            processAnnotation(annotation, annotatedElements);
        }

        return false;
    }

    private void processAnnotation(TypeElement annotation, Set<? extends Element> annotatedElements)
    {
        try
        {
            JsPoetGenerator generator = (JsPoetGenerator) Class.forName(buildGeneratorClass(annotation)).newInstance();

            for (Element element : annotatedElements)
            {
                generator.generate(getFiler(), element);
            }
        }
        catch (InstantiationException | IllegalAccessException | ClassNotFoundException | IOException e)
        {
            err("Cannot execute generator for " + annotation.getQualifiedName() + " [" + e.toString() + "]");
        }
    }
}

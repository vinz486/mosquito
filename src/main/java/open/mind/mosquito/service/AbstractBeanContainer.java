package open.mind.mosquito.service;


import java.util.concurrent.ConcurrentHashMap;

public abstract class AbstractBeanContainer<KEY, BEAN> extends AbstractService
{

    private ConcurrentHashMap<KEY, BEAN> beanMap = new ConcurrentHashMap<>();

    protected BEAN get(KEY key) {

        return beanMap.computeIfAbsent(key, this::create);
    }

    protected abstract BEAN create(KEY key);
}

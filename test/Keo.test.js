import keo from '../src/Keo';
import * as gremlin from '../example/Gremlin';

describe('Keo', () => {

    it('Should be able to return the same component when passed the same arguments;', () => {
        expect(keo(gremlin)).toEqual(keo(gremlin));
    });

});

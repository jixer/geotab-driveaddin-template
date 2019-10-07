import '../sample.html';
import '../images/icon.svg';
import '../styles/main.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import SampleAddin from './sample-addin';

geotab.addin.sample = function() { return new SampleAddin("sample")};
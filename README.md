# Joi Plugin
Hackolade plugin for Joi

<div class="main-content">

<span class="rvts6">For each object in Hackolade, we've defined a set of standard properties that appear in the properties pane.  But it is possible that your company wants to define and track additional properties for models, containers, entities, and attributes.  Hackolade let's you do just that, by leveraging our plugin architecture (used also to integrate our modeling engine with all kinds of NoSQL document databases.)</span>

<h1>Hackolade Joi Plugin - Generation of Joi models</h1>
<p>
  To generate joi models from your hackolade model we first need a couple of
  things:
</p>
<ol>
  <li>
    An existing model created with the JSON target of hackolade (<em
      >Note: Not required if you are building one from scratch</em
    >)
  </li>
  <li>A hackolade pro license (the only one that allows generation of Joi)</li>
  <li>
    The Joi plugin for hackolade (now available in hackolade by default, you
    just need to install it)
  </li>
</ol>
<p>Contents</p>
<ol>
  <li>
    <a>Installation and usage</a>
    <ol>
      <li><a>Installation</a></li>
      <li><a>Plugin features / usage</a></li>
    </ol>
  </li>
  <li><a>Generation with an existing JSON targeted model</a></li>
  <li><a>Generation through a new model created from scratch</a></li>
</ol>
<h1>Installation / usage of the Joi plugin</h1>
<h2>Installation</h2>
<h3>Step 1</h3>
<p>To install the Joi plugin download hackolade first.</p>
<h3>Step 2</h3>
<p>Open hackolade and go to Help > DB target plugin manager (or "Plugin Manager" depending on hackolade version):</p>
<h3>Step 3</h3>
<p>Next look in the store for the Joi plugin and press on install:</p>
<p>
  <img
    height="150"
    src="lib/image2019-install-plugin.png"
  />
</p>
<p><br /></p>
<p>Now you have successfully installed the Joi plugin.</p>
<h3>Step 4</h3>
<p>Restart hackolade to make the plugin show when creating a new model.</p>
<h2>Plugin features / usage</h2>
<p>Currently the plugin only supports the most simple features of Joi.</p>
<h3>Joi Types Supported:</h3>
<p>
  <img
    height="250"
   src="lib/image2019-joi-types.png"
  />
</p>
<p>
  If we were to create an object with each type we will see the following: (<em
    >Note: that the object type and array support multiple children because of
    their nature</em
  >)
</p>
<p style="margin-left: 30.0px;">
  const schema = Joi.object().keys({<br />myString: Joi.string(),<br />myInt:
  Joi.number(),<br />myDate: Joi.date(),<br />myBool: Joi.bool(),<br />myObject:
  Joi.object().keys({}),<br />myArray: Joi.array().items(Joi.string()),<br />myNull:
  Joi.valid(null).required()<br />});
</p>
<h3>Properties</h3>
<p>The following properties are supported in the property pane:</p>
<p>
  <em><strong>Joi.Required() - required (checkbox)</strong></em>
</p>
<p>
  Supported Types: String, int, date, bool, object, array, null (by default is
  always required)
</p>
<p>
  <em
    ><strong
      ><img
        width="352"
        src="lib/image2019-required-properties.png"/>
      </strong></em>
</p>
<p>
  <em><strong>Joi.Optional().allow(null) - optional (checkbox)</strong></em>
</p>
<p>Supported Types: String, int, date, bool, object, array</p>
<p>
  <img
    width="314"
    src="lib/image2019-optional-properties.png"
  />
</p>
<p>
  <strong
    ><em
      >Joi.length(), Joi.max(), Joi.min() - Min Length (Textbox), Max Length
      (Textbox), Length (Textbox)</em
    ></strong
  >
</p>
<p>Supported Types: String</p>
<p>
  <img
    width="337"
    src="lib/image2019-string-properties.png"
  />
</p>
<p><br /></p>
<p>
  Support for other Joi generation features will be based on feedback from
  users.
</p>
<p><br /></p>
<p>
  <strong
    >Note: A lot of other properties are in the properties pane, please ignore
    those for now as those are default properties of hackolade.
  </strong>
</p>
<p>
  <strong>They will just be ignored by the Json plugin generation. </strong>
</p>
<p><br /></p>
<h2>Generation with an existing JSON targeted model</h2>
<p>
  Most likely you want to generate your Joi objects from an existing JSON
  targeted model. You can do this fairly easily.
</p>
<h3>Step 1</h3>
<p>
  First open the existing model you have (the hackolade file) in VSCode or
  Notepad++ (or even notepad). Find the text &quot;appTarget&quot;. You should
  see the following:
</p>
<p>
  <img
    height="150"
    src="lib/image2019-apptarget.png"
  />
</p>
<p>Now change &quot;JSON&quot; to &quot;JOI&quot;.</p>
<p>
  This will allow hackolade to open up your model in the Joi context (which has
  the feature to generate Joi objects)
</p>
<h3>Step 2</h3>
<p>Next step is to open the document in hackolade</p>
<p>Open hackolade.</p>
<p>In the &quot;Common Tasks&quot; section select &quot;Open Model&quot;.</p>
<p>
  <img
    height="250"
    src="lib/image2019-common-tasks.png"
  />
</p>
<p>
  Now look for the model you just changed and select it to open it in hackolade.
</p>
<p>
  If everything went correctly you should see the model loaded in hackolade.
</p>
<h3>Step 3</h3>
<p>
  The next step is generating our joi models. Go to Tools → Forward-Engineer →
  Generate Joi Objects
</p>
<p>
  <img
    height="150"
    src="lib/image2019-forward-engineer.png"
  />
</p>
<p>
  You will notice you will be presented with a screen that allows you to select
  what you want to generate.
</p>
<p>
  <img
    height="250"
    src="lib/image2019-select-models.png"
  />
</p>
<p><br /></p>
<p>
  Select what you want to generate Joi objects for and click on submit. Now
  select the directory and it will generate your Joi objects successfully.
</p>
<p>
  The output will put all the Joi objects in separate folders for you, if you
  have multiple documents.
</p>
<p>
  <img
    height="150"
    src="lib/image2019-folder-structure.png"
  />
</p>
<p>
  Lastly the Joi objects might need some adjustments as some naming you might
  have chosen for your objects in hackolade breaks the javascript syntax. 
  e.g. if you named an object "New Field" for instance, spaces aren't allowed on properties in javascript / typescript.
</p>
<p>
  <img
    height="250"
    src="lib/image2019-joi-generation.png"
  />
</p>
<h2>Generation through a new model created from scratch</h2>
<p>
  Generation through a new model is much easier as you will just need to create
  a need model and select the target in hackolade to be Joi.
</p>
<h3>Step 1</h3>
<p>
  Open hackolade and select &quot;New Model&quot; in &quot;Common Tasks&quot;
  section.
</p>
<p>
  <img
    height="250"
    src="lib/image2019-common-tasks.png"
  />
</p>
<h3>Step 2</h3>
<p>
  Next select the Joi target type (if it's not there install the plugin as
  mentioned at the start of this document.)
</p>
<p>
  <img
    height="250"
    src="lib/image2019-joi-target.png"
  />
</p>
<p>
  Now create the model (if you are unfamiliar on how to create a model in
  hackolade please read the hackolade JSON documentation)
</p>
<h3>Step 3</h3>
<p>
  Next follow step 3 from the previous section &quot;Generation with an existing
  JSON targeted model&quot; and go onwards from there.
</p>
<p><br /></p>

</div>

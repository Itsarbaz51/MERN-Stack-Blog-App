import AuthorePost from "../components/PostAuthor";
import { Link } from "react-router-dom";
import Thumbnail from "../images/thumbnail.jpg";

function PostDetails() {
  return (
    <section>
      <div className="bg-slate-50 pl-7 pr-7 pb-4 m-6 text-xs rounded sm:ml-16 sm:mr-16 md:ml-32 md:mr-32">
        <div className="flex justify-between mb-3 text-black p-1 text-xs">
          <AuthorePost />
          <div className="mt-[25px] text-[10px] md:text-xs">
            <Link to={`/posts/id/edit`} className="bg-purple-600 px-2 py-1 text-gray-200 hover:bg-purple-700 rounded-md">Edit</Link>
            <Link to={`/posts/id/delete`} className=" ml-4 bg-red-600 px-2 py-1 text-gray-200 hover:bg-red-700 rounded-md">Delete</Link>
          </div>
        </div>
        <h1 className="mb-2 font-bold text-2xl">This is the post title!!</h1>
        <div>
          <img src={Thumbnail} alt="" className="mb-2 rounded" />
        </div>
        <p className="mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          quaerat ratione ex! Libero quisquam nobis natus at magni ab, obcaecati
          ullam rem? Sapiente ad cumque vero earum, praesentium corporis tempore
          quam minima libero omnis quo numquam repudiandae exercitationem vel
          excepturi!
        </p>

        <p className="mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
          recusandae omnis neque possimus commodi quae quod consectetur ea earum
          minus fugiat voluptate enim sed, aliquam sequi id excepturi
          perspiciatis totam quis, quia in debitis maiores, deserunt officiis?
          Nulla ipsam unde quibusdam? Similique quidem aut modi, excepturi
          assumenda laudantium inventore tempora quos. Enim eum atque est?
        </p>
        <p className="mb-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi
          eaque debitis ipsum delectus suscipit, autem eveniet officia enim
          voluptatum aperiam minima praesentium harum vero reiciendis. Sequi
          cumque natus quis aut aliquid, reiciendis ipsam dolorem nobis tempore
          facilis hic repudiandae est consectetur animi ab cupiditate quia
          deleniti distinctio. Esse officia provident minima architecto eius
          beatae recusandae delectus quod repellat ab voluptates amet ut quaerat
          quia accusantium deleniti similique, iusto natus officiis possimus
          cumque laboriosam, magnam nisi doloribus! Iste vero tenetur quis
          mollitia consequatur! Officia laboriosam error excepturi libero
          accusantium, recusandae accusamus inventore aut deleniti vitae
          praesentium nostrum maiores commodi assumenda. Eius voluptatibus ipsam
          similique provident maiores laudantium ex quidem culpa reprehenderit
          accusantium animi, itaque perferendis illum recusandae sint tempore
          nisi? Cum tenetur maiores laboriosam id ex, fuga distinctio excepturi
          harum placeat nihil dignissimos. Mollitia soluta dolor dolorem ipsum
          voluptatibus aspernatur temporibus ea earum eveniet rerum assumenda,
          natus autem at consequuntur, corrupti esse, repellat ut tempora nam
          enim accusantium minima. Inventore velit voluptatem laboriosam autem.
          Nam in voluptatum veritatis minus officia id neque! Delectus sint in
          rem dolorum hic porro, explicabo asperiores suscipit ad sit soluta
          recusandae dolorem ipsam eum blanditiis fugiat officiis neque
          temporibus aliquid magni ipsa quo architecto. Pariatur.
        </p>
        <p className="mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit id
          nulla labore quidem perspiciatis cupiditate necessitatibus illo? Iusto
          placeat, odit aut autem ad accusantium commodi sunt? Assumenda maxime
          hic eveniet soluta cumque, commodi, amet reprehenderit minus sequi
          debitis incidunt corporis illo repudiandae quia, earum delectus harum?
          Repellat fugiat nisi voluptas consectetur eum libero? Excepturi
          consequuntur iusto eligendi iste eaque eius. Sequi ab magni soluta,
          consequatur placeat et aliquid sit odio maxime eligendi, tempore
          tempora quisquam eum consectetur ipsam est in, dolorem corrupti
          facilis! Molestias illum autem, a deserunt porro eum provident,
          dolorum nobis exercitationem quas atque voluptate voluptas accusantium
          fuga odit, non maxime sunt ab debitis dolorem dolor reprehenderit
          cumque! Voluptate aperiam nobis quae at consequuntur excepturi ea
          porro? Dignissimos quas natus blanditiis repudiandae alias, adipisci
          voluptatem repellat ratione perspiciatis esse reprehenderit saepe,
          iusto soluta doloremque officia totam nobis veniam? Dicta quaerat
          nobis id labore eveniet voluptatem similique animi explicabo libero
          enim sed, distinctio, delectus quibusdam deserunt, odit provident quo
          sunt neque at consequuntur reprehenderit. Perspiciatis nulla dolor
          eligendi. Asperiores enim qui natus consequatur modi fugit tenetur
          nihil consectetur, beatae corrupti. Consequatur nobis, suscipit
          aliquid facere a recusandae odit illo mollitia eos, vitae sunt error,
          beatae voluptates deleniti ea. Sed aperiam animi aliquid, iure iste
          dolorum deleniti quod quae in ipsam veritatis aspernatur delectus
          fugiat excepturi laudantium est ipsa id nam, ad sequi ex vel?
        </p>
      </div>
    </section>
  );
}

export default PostDetails;

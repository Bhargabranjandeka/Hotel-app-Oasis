import supabase from "./Supabase"

import { supabaseUrl } from "./Supabase";

export async function getCabins() {

  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error)
    throw new Error("can't find the table")
  }

  return data;

}

export async function createnewcabin(newcabin, id) {
  const hasImagePath = newcabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${newcabin.image.name}`.replace("/", "")

  const imagePath = hasImagePath ? newcabin.image : `${supabaseUrl}/storage/v1/object/public/Cabins-images/${imageName}`

  let query = supabase.from('cabins');
  if (!id) query = query.insert([{ ...newcabin, image: imagePath }]);

  if (id) query = query.update({ ...newcabin, image: imagePath }).eq('id', id)

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error)
    throw new Error("can't find the table")
  }

  if (hasImagePath) return data
  const { error: storageError } = await supabase.storage.from("Cabins-images").upload(imageName, newcabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.log(storageError);
    throw new Error("cabin image could not be uploaded")
  }

  return data
};

export async function deleteCabins(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error("can't find the table")
  }

  return data;
}